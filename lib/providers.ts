import { error } from 'util';
import { MINDLESS_SERVICE_INDENTIFIERS } from './types';
import { DefaultConfig, MindlessConfig } from './configs';
import { Container } from 'inversify';
import { Dynamo } from './data';

export const registerProviders = (container: Container) => {
    if (!container.isBound(MINDLESS_SERVICE_INDENTIFIERS.MindlessConfig)) {
        container.bind<MindlessConfig>(MINDLESS_SERVICE_INDENTIFIERS.MindlessConfig).to(DefaultConfig);
    }

    container.bind<Dynamo>(MINDLESS_SERVICE_INDENTIFIERS.Dynamo).to(Dynamo);
}