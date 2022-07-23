import { kataEntity } from '../entities/Kata.entity';
import { LogError } from '../../utils/logger';

// CRUD
/**
 * Method to obtain all Katas from Collection "Katas" in Mongo db
 */
export const getAllKatas = async (): Promise<any[] | undefined> => {
  try {
    const kataModel = kataEntity();

    // Search all katas
    return await kataModel.find({ isDelete: false });
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas: ${error}`);
  }
};

// - Get Kata by ID
export const getKataByID = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Search Kata by ID
    return await kataModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata By ID: ${error}`);
  }
};

// - Delete Kata by ID
export const deleteKataByID = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Delete Kata by ID
    return await kataModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deletting Kata By ID: ${error}`);
  }
};

// - Create new Kata
export const createKata = async (kata: any): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Create / Insert new Kata
    return await kataModel.create(kata);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating Kata: ${error}`);
  }
};

// - Update Kata by ID
export const updateKataByID = async (id: string, kata: any): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Update Kata
    return await kataModel.findByIdAndUpdate(id, kata);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`);
  }
};

// - Get Katas By Level
export const getKataByLevel = async (level: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Get Kata By Level
    return await kataModel.find({ level });
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata by Level ${level}: ${error}`);
  }
};

// - Get 5 latest Katas
export const getLatestKatas = async (): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Get latest Katas
    return await kataModel.find({}).sort({ date: 'desc' }).limit(5);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting 5 latest Katas: ${error}`);
  }
};

// - Get Best Rated Katas
export const getBestKatas = async (): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Get best rated Katas
    return await kataModel.find({}).sort({ valoration: 'desc' });
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Best Rated Katas: ${error}`);
  }
};

// - Get Katas By Number of Chances
export const getKatasByChances = async (): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Get Katas by Number of Chances
    return await kataModel.find({}).sort({ chances: 'desc' });
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Katas Sorted By Chances: ${error}`);
  }
};

// - Rate a Kata
export const rateKata = async (id: string, userValoration: number): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity();
    // Rate a Kata
    const kata = await kataModel.findById(id);
    const avgValoration = (kata.valoration * kata.peopleWhoRated + userValoration) / (kata.peopleWhoRated + 1);
    kata.peopleWhoRated = kata.peopleWhoRated + 1;
    // Store average rate
    kata.valoration = Number(avgValoration.toFixed(1));
    console.log(kata.peopleWhoRated, avgValoration);
    return await kata.save();
  } catch (error) {
    LogError(`[ORM ERROR]: Ratting a Kata: ${error}`);
  }
};
