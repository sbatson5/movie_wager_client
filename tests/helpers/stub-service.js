import Service from '@ember/service';
import { warn } from '@ember/debug';
import { typeOf } from '@ember/utils';
import { getContext } from '@ember/test-helpers';

let stubService = (name, hash = {}) => {
  if (typeOf(name) !== 'string') {
    warn('The name of the service must be a string', false, { id: 'service-stub-1' });
  }

  let stubbedService = Service.extend(hash);
  let { owner } = getContext();
  owner.register(`service:${name}`, stubbedService);
};

export default stubService;
