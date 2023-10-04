/* eslint no-console: 0 */
export const debuggerPlugin = {
  name: 'my-debugger',
  track: ({ payload, instance }: any) => {
    console.log('Track from debugger', payload);
    console.log(instance.getState().plugins);
  },
  page: ({ payload, instance }: any) => {
    console.log('Page from debugger', payload);
    console.log(instance.getState().plugins);
  },
  identify: ({ payload, instance }: any) => {
    console.log('Identify from debugger', payload);
    console.log(instance.getState().plugins);
  },
};
