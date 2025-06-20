import pygame
import random
import neat
import os
import math

# ------------------ CONFIGURAÇÃO ------------------
WIDTH, HEIGHT = 800, 600
TILE_SIZE = 4
FPS = 60
NUM_ANTS = 50
PHEROMONE_DECAY = 0.995
PHEROMONE_DEPOSIT = 5
FOOD_SPAWN_CHANCE = 0.005
MAX_ENERGY = 300
GENERATIONS = 50
CONFIG_PATH = 'neat-config.txt'

DIRT_COLOR = (194, 178, 128)
ANT_COLOR = (0, 0, 0)
FOOD_COLOR = (0, 200, 0)
PHEROMONE_COLOR = (200, 200, 255)

class Ant:
    moves = [(1,0),(-1,0),(0,1),(0,-1)]
    def __init__(self, genome, config, x, y):
        self.net = neat.nn.FeedForwardNetwork.create(genome, config)
        self.genome = genome
        self.x, self.y = x, y
        self.energy = MAX_ENERGY
        self.carry = False
    def update(self, terr):
        # inputs: pheromone_level, food_present, normalized x, y, carry flag
        pher = terr.pheromones[self.y][self.x]
        food = 1.0 if terr.grid[self.y][self.x]['food'] > 0 else 0.0
        inputs = [pher/255.0, food, self.x/terr.w, self.y/terr.h, float(self.carry)]
        outputs = self.net.activate(inputs)
        # choose move by highest output
        idx = outputs.index(max(outputs))
        dx, dy = Ant.moves[idx]
        nx, ny = self.x + dx, self.y + dy
        if 0 <= nx < terr.w and 0 <= ny < terr.h:
            self.x, self.y = nx, ny
        self.energy -= 1
        # interação com ambiente
        if not self.carry and terr.grid[self.y][self.x]['food'] > 0:
            self.carry = True
            terr.grid[self.y][self.x]['food'] -= 1
        elif self.carry and (self.x, self.y) == terr.home:
            self.carry = False
            terr.food += 1
            self.energy = MAX_ENERGY
        # depósito de feromônio
        terr.pheromones[self.y][self.x] = min(255,
            terr.pheromones[self.y][self.x] + (PHEROMONE_DEPOSIT if self.carry else PHEROMONE_DEPOSIT/2))
        # fitness incremental
        self.genome.fitness += terr.food

class Terrarium:
    def __init__(self):
        self.w, self.h = WIDTH//TILE_SIZE, HEIGHT//TILE_SIZE
        self.grid = [[{'food':0} for _ in range(self.w)] for _ in range(self.h)]
        self.pheromones = [[0.0]*self.w for _ in range(self.h)]
        self.home = (self.w//2, self.h//2)
        self.food = 0
        self.ants = []
    def add_ant(self, ant):
        self.ants.append(ant)
    def reset(self, genomes, config):
        self.ants = []
        self.food = 0
        # espalha comida inicial
        for y in range(self.h):
            for x in range(self.w):
                self.grid[y][x]['food'] = 0
        for _ in range(100):
            fx, fy = random.randint(0, self.w-1), random.randint(0, self.h-1)
            self.grid[fy][fx]['food'] = random.randint(1,3)
        self.pheromones = [[0.0]*self.w for _ in range(self.h)]
        for gid, genome in genomes:
            genome.fitness = 0.0
            x = self.home[0] + random.randint(-3,3)
            y = self.home[1] + random.randint(-3,3)
            self.add_ant(Ant(genome, config, x, y))
    def update(self):
        # spawn de comida
        if random.random() < FOOD_SPAWN_CHANCE:
            fx, fy = random.randint(0, self.w-1), random.randint(0, self.h-1)
            self.grid[fy][fx]['food'] += 1
        for ant in self.ants:
            ant.update(self)
        # decaimento feromônio
        for y in range(self.h):
            for x in range(self.w):
                self.pheromones[y][x] *= PHEROMONE_DECAY
    def draw(self, screen):
        screen.fill(DIRT_COLOR)
        for y in range(self.h):
            for x in range(self.w):
                if self.pheromones[y][x] > 1:
                    screen.fill(PHEROMONE_COLOR, (x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE))
                if self.grid[y][x]['food'] > 0:
                    screen.fill(FOOD_COLOR, (x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE))
        hx, hy = self.home
        pygame.draw.circle(screen, (255,0,0), (hx*TILE_SIZE+TILE_SIZE//2, hy*TILE_SIZE+TILE_SIZE//2), TILE_SIZE*2)
        for ant in self.ants:
            screen.fill(ANT_COLOR, (ant.x*TILE_SIZE, ant.y*TILE_SIZE, TILE_SIZE, TILE_SIZE))

# Função de avaliação para o NEAT
def eval_genomes(genomes, config):
    terr = Terrarium()
    terr.reset(genomes, config)
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    clock = pygame.time.Clock()
    steps = FPS * 10  # avaliar por 10 segundos
    for _ in range(steps):
        terr.update()
    # fitness já acumulado nas genomas
    pygame.quit()

if __name__ == '__main__':
    # carrega configuração NEAT
    local_dir = os.path.dirname(__file__)
    config_path = os.path.join(local_dir, CONFIG_PATH)
    config = neat.Config(neat.DefaultGenome, neat.DefaultReproduction,
                         neat.DefaultSpeciesSet, neat.DefaultStagnation,
                         config_path)
    p = neat.Population(config)
    p.add_reporter(neat.StdOutReporter(True))
    stats = neat.StatisticsReporter()
    p.add_reporter(stats)
    winner = p.run(eval_genomes, GENERATIONS)
    # exibe resultado
    print('\n===> Melhor Genoma <===\n', winner)
    # após treinar, roda simulação com melhor genoma
    config = neat.Config(neat.DefaultGenome, neat.DefaultReproduction,
                         neat.DefaultSpeciesSet, neat.DefaultStagnation,
                         config_path)
    terr = Terrarium()
    terr.reset([(None, winner)], config)
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    clock = pygame.time.Clock()
    running = True
    while running:
        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                running = False
        terr.update()
        terr.draw(screen)
        pygame.display.flip()
        clock.tick(FPS)
    pygame.quit()
