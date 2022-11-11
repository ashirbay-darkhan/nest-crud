import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = []

  insertUser(name: string, age: number, surname: string, email: string) {
    const id = uuidv4()
    const newUser = new User(id, name, age, surname, email)
    this.users.push(newUser)
    return id
  }

  getUsers() {
    return [...this.users]
  }

  getUser(id: string) {
    return this.getUserById(id)[0]
  }

  updateUser(
    userId: string,
    name: string,
    age: number,
    surname: string,
    email: string
  ) {
    const [targetUser, index] = this.getUserById(userId)
    const nup = {...targetUser, name, age, surname, email}
    const newUser = new User(userId, nup.name, nup.age, nup.surname, nup.email)
    this.users[index] = newUser
    return newUser
  }

  deleteUser(id: string) {
    const [_, index] = this.getUserById(id)
    this.users.splice(index, 1)
  }

  private getUserById(id: string): [User, number] {
    const index = this.users.findIndex(u => u.id === id)
    return [this.users[index], index]
  }
}