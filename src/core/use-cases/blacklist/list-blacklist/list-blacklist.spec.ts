import { module_mock } from "app.module.mock";
import { IBlacklistRepository } from "@database/postgres/repositories/interface/blacklist-repository.interface";
import { Input } from "./input";
import { FakeBlacklistRepository } from "@database/postgres/repositories/fake/blacklist.repository.fake";
import { InvalidCpfException, NotFoundCpfException } from "core/exceptions";
import { Blacklist } from "@database/postgres/entities/blacklist.entity";
import { randomUUID } from "crypto";
import { ListBlacklist } from "./list-blacklist.use-case";

describe('ListBlacklist', () => {
  let use_case: ListBlacklist;
  let repository: FakeBlacklistRepository;

  beforeEach(async () => {
    const moduleRef = await module_mock()
    use_case = moduleRef.get<ListBlacklist>(ListBlacklist);
    repository = moduleRef.get<IBlacklistRepository>(IBlacklistRepository) as FakeBlacklistRepository;
  })

  const blacklist: Partial<Blacklist> = {
    id: randomUUID(),
    cpf: '19127954005'
  }

  it.each([
    {
      should: 'list cpf from blacklist successfuly',
      input: {},
      setup: () => {
        repository.findMany.mockResolvedValueOnce({list: [blacklist], count: 1})
      },
      expected: (result: any) => {
       expect(result).toEqual({list: [blacklist], count: 1});
      }
    },
  ])('Should $should', async ({ input, setup, expected }) => {
    if(setup) setup();

    await use_case.execute(input as unknown as Input).then(expected).catch(expected)
  })
})