import { kataEntity } from '../entities/Kata.entity';
import { userEntity } from '../entities/User.entity';
import { LogError } from '../../utils/logger';
import { IKata } from '../interfaces/IKata.interface';

// Http Context
import httpContext from 'express-http-context';

// Environment variables
import dotenv from 'dotenv';

// Configuration of environment variables
dotenv.config();

// CRUD

/**
 * Method to get all Katas from "Katas" Collection in Mongo Server
 */
export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    const kataModel = kataEntity();

    const response: any = {};

    // Search all Katas (using pagination)
    await kataModel
      .find({ isDeleted: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas;
      });

    // Count total documents in collection "Katas"
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas: ${error}`);
  }
};

// - Get Kata By ID
export const getKataByID = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();

    // Search Kata By ID
    return await kataModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata By ID: ${error}`);
  }
};

// - Delete Kata By ID
export const deleteKataByID = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    const userModel = userEntity();

    const kata = await kataModel.findById(id);

    const loggedUser = httpContext.get('user');
    const kataCreator = kata.creator.toString();

    if (loggedUser === kataCreator) {
      // Delete Kata BY ID
      await kataModel.deleteOne({ _id: id });

      // Delete kata from user model
      const user = await userModel.findById(loggedUser);
      user.katas = user.katas.filter((kataId: string) => kataId !== id);

      return await user.save();
    }

    return false;
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting Kata By ID: ${error}`);
  }
};

// - Create New Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    const userModel = userEntity();

    // Get logged User
    const loggedUser = httpContext.get('user');
    kata.creator = loggedUser;

    // Create / Insert new Kata
    const kataCreated = await kataModel.create(kata);

    // Add kata to User document
    const user = await userModel.findById(loggedUser);
    user.katas.push(kataCreated._id.toString());
    user.save();

    return kataCreated;
  } catch (error) {
    LogError(`[ORM ERROR]: Creating Kata: ${error}`);
  }
};

// - Update Kata By ID
export const updateKataByID = async (id: string, kata: IKata): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();

    // Get logged User
    const loggedUser = httpContext.get('user');
    const kataCreator = kata.creator.toString();

    if (loggedUser === kataCreator) {
      // Update Kata
      return await kataModel.findByIdAndUpdate(id, kata);
    }

    return false;
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`);
  }
};

// - Get Katas By Level
export const getKatasByLevel = async (
  level: string,
  page: number,
  limit: number
): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    const response: any = {};
    const levelReg = new RegExp(level, 'i');

    // Get Kata By Level
    await kataModel
      .find({ level: levelReg })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas;
      });

    // Count total documents in collection "Katas"
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata by Level ${level}: ${error}`);
  }
};

// - Get Best Rated Katas
export const getBestKatas = async (page: number, limit: number): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    const response: any = {};
    // Get best rated Katas
    await kataModel
      .find({})
      .sort({ stars: 'desc' })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas;
      });

    // Count total documents in collection "Katas"
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });
    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Best Rated Katas: ${error}`);
  }
};

// - Rate a Kata //
export const rateKata = async (id: string, userValoration: number): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Rate a Kata
    const kata = await kataModel.findById(id);
    const avgValoration =
      (kata.stars * kata.peopleWhoRated + userValoration) / (kata.peopleWhoRated + 1);
    kata.peopleWhoRated = kata.peopleWhoRated + 1;
    // Store average rate
    kata.stars = Number(avgValoration.toFixed(1));

    return await kata.save();
  } catch (error) {
    LogError(`[ORM ERROR]: Ratting a Kata: ${error}`);
  }
};

export const solveKata = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();

    const kata = await kataModel.findById(id);
    if (!kata) return false;

    const solution = kata.solution;
    // Sum one solution to intents
    kata.intents = kata.intents + 1;
    await kata.save();
    // Return solution
    return solution;
  } catch (error) {
    LogError(`[ORM ERROR]: Solving a Kata: ${error}`);
  }
};
