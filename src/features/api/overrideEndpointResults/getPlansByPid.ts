import * as uuid from 'uuid';
import { unguessApi, GetPlansByPidApiResponse } from '../.';
import { components } from 'src/common/schema';

export const taskDataKey = Symbol('task');

export type TTask = components['schemas']['OutputModuleTask'] & {
  id: string;
};

unguessApi.enhanceEndpoints({
  endpoints: {
    getPlansByPid: {
      transformResponse: (response: GetPlansByPidApiResponse) => {
        if (response && response.config) {
          // find the task module if any
          const taskModule = response.config.modules.find(
            (module) => module.type === 'tasks'
          );
          if (taskModule && taskModule.output) {
            // add an id and a symbol to each task for better identification
            const mappedTasks = taskModule.output.map((task, index) => ({
              ...task,
              id: uuid.v4(), // generate a new UUID for each task
            }));
            taskModule.output = mappedTasks;
            // now we can safely return the response
            response.config.modules = response.config.modules.map((module) => {
              if (module.type === 'tasks') {
                return {
                  ...module,
                  output: mappedTasks,
                };
              }
              return module;
            });
          }
        }
        return response;
      },
    },
  },
});
