import { module_mock } from "app.module.mock";
import { CreateBlacklist } from "./create-blacklist.use-case"
import { IBlacklistRepository } from "@database/postgres/repositories/interface/blacklist-repository.interface";
import { Input } from "./input";
import { IClientRepository } from "@database/postgres/repositories/interface/client-repository.interface";
import { FakeClientRepository } from "@database/postgres/repositories/fake/client.repository.fake";
import { FakeBlacklistRepository } from "@database/postgres/repositories/fake/blacklist.repository.fake";
import { Client } from "@database/postgres/entities/client.entity";
import { randomUUID } from "crypto";
import { ExistsCpfException, InvalidCpfException } from "core/exceptions";

describe('CreateBlacklist', () => {
  let use_case: CreateBlacklist;
  let repository: FakeBlacklistRepository;
  let client_repository: FakeClientRepository;

  beforeEach(async () => {
    const moduleRef = await module_mock()
    use_case = moduleRef.get<CreateBlacklist>(CreateBlacklist);
    repository = moduleRef.get<IBlacklistRepository>(IBlacklistRepository) as FakeBlacklistRepository;
    client_repository = moduleRef.get<IClientRepository>(IClientRepository) as FakeClientRepository;
  })

  const input: Input = {
    cpf: '19127954005'
  }

  const client: Partial<Client> = {
    id: randomUUID()
  }

  it.each([
    {
      should: 'save the cpf without client successfuly',
      input,
      setup: () => {},
      expected: (result: any) => {
        expect(repository.save).toHaveBeenCalledWith({
          ...input,
          client: undefined
        })
      }
    },
    {
      should: 'save the cpf with client successfuly',
      input,
      setup: () => {
        client_repository.findOne.mockResolvedValueOnce(client)
      },
      expected: (result: any) => {
        expect(repository.save).toHaveBeenCalledWith({
          ...input,
          client
        })
      }
    },
    {
      should: 'throw ExistsCpfException when cpf already exists in blacklist',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce({ id: randomUUID(), cpf: input.cpf })
      },
      expected: (result: any) => {
        expect(repository.save).toHaveBeenCalledTimes(0)
        expect(result).toBeInstanceOf(ExistsCpfException)
      }
    },
    {
      should: 'throw InvalidCpfException when input is invalid',
      input: { cpf: '23721837128' },
      setup: () => {},
      expected: (result: any) => {
        expect(repository.save).toHaveBeenCalledTimes(0)
        expect(result).toBeInstanceOf(InvalidCpfException)
      }
    }
  ])('Should $should', async ({ input, setup, expected }) => {
    if(setup) setup();

    await use_case.execute(input as unknown as Input).then(expected).catch(expected)
  })
})