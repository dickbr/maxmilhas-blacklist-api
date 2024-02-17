import { IClientRepository } from "../interface/client-repository.interface";

export class FakeClientRepository implements IClientRepository {
  find = () => this;
  withBlacklist = () => this;
  byTerm = () => this;
  paginate = () => this;
  save = jest.fn();
  findOne = jest.fn();
  findMany = jest.fn();
  delete = jest.fn();
}