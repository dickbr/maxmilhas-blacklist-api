import { module_mock } from "app.module.mock";
import { Input } from "./input";
import { IClientRepository } from "@database/postgres/repositories/interface/client-repository.interface";
import { FakeClientRepository } from "@database/postgres/repositories/fake/client.repository.fake";
import { Client } from "@database/postgres/entities/client.entity";
import { randomUUID } from "crypto";
import { ExistsCpfException, InvalidCpfException } from "core/exceptions";
import { GetClient } from "./get-client.use-case";
import { NotExistsClientException } from "core/exceptions/NotExistsClientException";

describe('GetClient', () => {
  let use_case: GetClient;
  let repository: FakeClientRepository;

  beforeEach(async () => {
    const moduleRef = await module_mock()
    use_case = moduleRef.get<GetClient>(GetClient);
    repository = moduleRef.get<IClientRepository>(IClientRepository) as FakeClientRepository;
  })

  const input: Input = {
    cpf: '19127954005',
  }

  const client: Partial<Client> = {
    ...input,
    id: randomUUID(),
  }

  it.each([
    {
      should: 'get the client successfuly',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(client)
      },
      expected: (result: any) => {
        expect(result).toEqual(client)
      }
    },
    {
      should: 'return undfined when client not found and input has no_error true',
      input: { ...input, no_error: true },
      setup: () => {
        repository.findOne.mockResolvedValueOnce(undefined)
      },
      expected: (result: any) => {
        expect(result).toBeUndefined()
      }
    },
    {
      should: 'throw if client not found',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(undefined)
      },
      expected: (result: any) => {
        expect(result).toBeInstanceOf(NotExistsClientException)
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