import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array of movies', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.createOne({
        title: 'Test Movie',
        year: 2000,
        genres: ['test1', 'test2'],
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
    });
    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne()', () => {
    it('should delete a movie', () => {
      service.createOne({
        title: 'Test Movie',
        year: 2000,
        genres: ['test1', 'test2'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toEqual(beforeDelete - 1);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createOne()', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createOne({
        title: 'Test Movie',
        year: 2000,
        genres: ['test1', 'test2'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toEqual(beforeCreate + 1);
    });
  });

  describe('updateOne()', () => {
    it('should update a movie', () => {
      service.createOne({
        title: 'Test Movie',
        year: 2000,
        genres: ['test1', 'test2'],
      });
      service.updateOne(1, { title: 'Updated' });

      const updatedMovie = service.getOne(1);
      expect(updatedMovie.title).toEqual('Updated');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.updateOne(999, { title: 'Updated' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
