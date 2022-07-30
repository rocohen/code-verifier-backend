import { userEntity } from '../entities/User.entity';
import { kataEntity } from '../entities/Kata.entity';
import { LogError } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';
import { IAuth } from '../interfaces/IAuth.interface';
import { IKata } from '../interfaces/IKata.interface';
import { UsersResponse } from '../types/UsersResponse.type';
import mongoose from "mongoose";

// Environment variables
import dotenv from 'dotenv';

// BCRYPT for passwords
import bcrypt from 'bcrypt';

// JWT
import jwt from 'jsonwebtoken';

// Config of environment variables
dotenv.config();

// Obtain Secret key to generate JWT
const secret: string = process.env.SECRETKEY || 'MYSECRETKEY';

// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (
  page: number,
  limit: number
): Promise<UsersResponse | undefined> => {
  try {
    const userModel = userEntity();
    const response: UsersResponse = {
      users: [],
      totalPages: 0,
      currentPage: page,
    };

    // Search all users (using pagination)
    await userModel
      .find({ isDelete: false }, { password: 0, __v: 0 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((users: IUser[]) => {
        response.users = users;
      });

    // Count total documents in collection "Users"
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`);
  }
};

// - Get User by ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    // Search User by ID
    return await userModel.findById({ _id: id }, { password: 0, __v: 0 });
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
  }
};

// - Delete User by ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    // Delete User by ID
    return await userModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deletting User By ID: ${error}`);
  }
};

// - Update User by ID
export const updateUserByID = async (
  id: string,
  user: any
): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    // Update User
    return await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
  }
};

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    const userModel = userEntity();
    // Create / Insert new User
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
};

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    const userModel = userEntity();

    // Check if user exists by Unique Email
    const user: IUser | null = await userModel.findOne({ email: auth.email });

    if (!user) {
      console.error(`[ERROR Authentication in ORM]: User Not Found`);
      return {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Please, provide a valid email && password to login',
      };
    }

    // Check if Password is Valid (compare with bcrypt)
    const validPassword = bcrypt.compareSync(auth.password, user.password);

    if (!validPassword) {
      console.error(`[ERROR Authentication in ORM]: Password Not Valid`);
      return {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Please, provide a valid email && password to login',
      };
    }

    // Generate our JWT
    const token = jwt.sign({ email: user.email }, secret, {
      expiresIn: '2h',
    });

    return {
      user,
      token,
    };
  } catch (error) {
    LogError(`[ORM ERROR]: Login User: ${error}`);
  }
};

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
  // TODO: Not implemented
};

/**
 * Method to Get all Users from "Users" Collection in Mongo Server
 */
export const getKatasByUser = async (
  page: number,
  limit: number,
  id: string
): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity();
    const katasModel = kataEntity();

    let katasFound: IKata[] = [];

    const response: any = {
      katas: [],
    };

    console.log('User ID', id);

    await userModel
      .findById(id)
      .then(async (user: IUser) => {
        response.user = user.email;

        // Create types to search
        const objectIds: mongoose.Types.ObjectId[] = [];
        user.katas.forEach((kataID: string) => {
          const objectID = new mongoose.Types.ObjectId(kataID);
          objectIds.push(objectID);
        });

        await katasModel
          .find({ _id: { $in: objectIds } })
          .then((katas: IKata[]) => {
            katasFound = katas;
          });
      })
      .catch((error) => {
        LogError(`[ORM ERROR]: Getting User: ${error}`);
      });

    response.katas = katasFound;

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`);
  }
};
