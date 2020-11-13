import bcrypt from "bcrypt";
import { getRepository, Repository, DeleteResult } from "typeorm";
import User from "../../entities/User";
import { IManager } from "../common/manager";

interface UserInput extends User {
  password: string;
}

class UserManager implements IManager {
  protected userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  /**
   * Get user by primary key
   *
   * FIXME
   */
  public async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    return Promise.resolve(user);
  }

  /**
   * Create a new user
   */
  public async createUser(userDetails: Partial<UserInput>): Promise<User> {
    // 1. Hash password
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(userDetails.password, saltRound);

    // 2. Create user
    const newUser = new User();
    newUser.username = userDetails.username;

    return this.userRepository.save(newUser);
  }

  /**
   * Update user details
   *
   * FIXME
   */
  public async updateUser(
    userId: string,
    updates: Partial<User>
  ): Promise<User> {
    const updateUser = await this.userRepository.findOne(userId);
    if (updateUser) {
      updateUser.username = updates.username;
      await this.userRepository.save(updateUser);
    }
    return Promise.resolve(updateUser);
  }

  /**
   * Delete user
   *
   * Basic Requirements:
   * - Delete User from database
   *
   * Advanced Requirements:
   * - Soft delete user from database
   *
   * FIXME
   */
  public async removeUser(userId: string): Promise<DeleteResult | void> {
    const deleteUser = await this.userRepository.delete(userId);
    return Promise.resolve(deleteUser);
  }

  /**
   * Verifies username and password
   *
   * Pseudocode:
   * - IF the username and password matches -> returns the User object
   * - ELSE -> returns null
   */
  public async verifyAndGetUser(
    username: string,
    password: string
  ): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new Error("username not found");
    }

    return user;
  }
}

export default UserManager;
