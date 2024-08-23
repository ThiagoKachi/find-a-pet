import { OrgsController } from '../infra/http/controllers/OrgsController';
import { makeCreateOrgUseCase } from './makeCreateOrgUseCase';
import { makeDeleteOrgUseCase } from './makeDeleteOrgUseCase';
import { makeListOrgsUseCase } from './makeListOrgsUseCase';
import { makeShowOrgUseCase } from './makeShowOrgUseCase';
import { makeUpdateOrgUseCase } from './makeUpdateOrgUseCase';

export function makeOrgUseCase() {
  const createOrgUseCase = makeCreateOrgUseCase();
  const listOrgsUseCase = makeListOrgsUseCase();
  const showOrgUseCase = makeShowOrgUseCase();
  const deleteOrgUseCase = makeDeleteOrgUseCase();
  const updateOrgUseCase = makeUpdateOrgUseCase();

  return new OrgsController(
    createOrgUseCase,
    listOrgsUseCase,
    showOrgUseCase,
    deleteOrgUseCase,
    updateOrgUseCase
  );
}
