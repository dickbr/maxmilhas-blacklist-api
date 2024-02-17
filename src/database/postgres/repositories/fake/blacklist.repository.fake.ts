import { IBlacklistRepository } from "../interface/blacklist-repository.interface";

export class FakeBlacklistRepository implements IBlacklistRepository{
  paginate = () => this;
  find = () => this;
  byTerm = () => this;
  withClient = () => this;
  save = jest.fn();
  findOne = jest.fn();
  findMany = jest.fn();
  delete = jest.fn();
}