import { module_mock } from "app.module.mock";
import { IBlacklistRepository } from "@database/postgres/repositories/interface/blacklist-repository.interface";
import { Input } from "./input";
import { FakeBlacklistRepository } from "@database/postgres/repositories/fake/blacklist.repository.fake";
import { DeleteBlacklist } from "./delete-blacklist.use-case";
import { InvalidCpfException, NotFoundCpfException } from "core/exceptions";
import { Blacklist } from "@database/postgres/entities/blacklist.entity";
import { randomUUID } from "crypto";

describe('DeleteBlacklist', () => {
  let use_case: DeleteBlacklist;
  let repository: FakeBlacklistRepository;

  beforeEach(async () => {
    const moduleRef = await module_mock()
    use_case = moduleRef.get<DeleteBlacklist>(DeleteBlacklist);
    repository = moduleRef.get<IBlacklistRepository>(IBlacklistRepository) as FakeBlacklistRepository;
  })

  const input: Input = {
    cpf: '19127954005'
  }

  const blacklist: Partial<Blacklist> = {
    id: randomUUID(),
    cpf: '19127954005'
  }

  it.each([
    {
      should: 'delete cpf from blacklist successfuly',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(blacklist)
      },
      expected: (result: any) => {
       expect(repository.delete).toHaveBeenCalledWith(blacklist);
      }
    },
     {
      should: 'throw NotFoundCpfException when input is invalid',
      input,
      setup: () => {},
      expected: (result: any) => {
        expect(repository.delete).toHaveBeenCalledTimes(0)
        expect(result).toBeInstanceOf(NotFoundCpfException)
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