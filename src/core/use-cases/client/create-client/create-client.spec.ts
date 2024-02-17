import { module_mock } from "app.module.mock";
import { Input } from "./input";
import { IClientRepository } from "@database/postgres/repositories/interface/client-repository.interface";
import { FakeClientRepository } from "@database/postgres/repositories/fake/client.repository.fake";
import { Client } from "@database/postgres/entities/client.entity";
import { randomUUID } from "crypto";
import { ExistsCpfException, InvalidCpfException } from "core/exceptions";
import { CreateClient } from "./create-client.use-case";

describe('CreateClient', () => {
  let use_case: CreateClient;
  let repository: FakeClientRepository;

  beforeEach(async () => {
    const moduleRef = await module_mock()
    use_case = moduleRef.get<CreateClient>(CreateClient);
    repository = moduleRef.get<IClientRepository>(IClientRepository) as FakeClientRepository;
  })

  const input: Input = {
    cpf: '19127954005',
    name: 'some-name'
  }

  const client: Partial<Client> = {
    ...input,
    id: randomUUID(),
  }

  it.each([
    {
      should: 'save the client successfuly',
      input,
      setup: () => {
        repository.save.mockResolvedValueOnce(client)
      },
      expected: (result: any) => {
        expect(repository.save).toHaveBeenCalledWith(input),
        expect(result).toEqual(client)
      }
    },
    {
      should: 'throw if cpf of client already exists',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(client)
      },
      expected: (result: any) => {
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