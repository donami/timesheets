// import gql from 'graphql-tag';

export const defaults = {
  // todos: [],
  // visibilityFilter: 'SHOW_ALL',
};

// let nextTodoId = 0;

export const resolvers = {
  // Mutation: {
  //   addTodo: (_: any, { text }: any, { cache }: any) => {
  //     const query = gql`
  //       query GetTodos {
  //         todos @client {
  //           id
  //           text
  //           completed
  //         }
  //       }
  //     `;
  //     const previous = cache.readQuery({ query });
  //     const newTodo = {
  //       text,
  //       // tslint:disable-next-line:no-increment-decrement
  //       id: nextTodoId++,
  //       completed: false,
  //       __typename: 'TodoItem',
  //     };
  //     const data = {
  //       todos: previous.todos.concat([newTodo]),
  //     };
  //     cache.writeData({ data });
  //     return newTodo;
  //   },
  //   toggleTodo: (_: any, variables: any, { cache }: any) => {
  //     // const id = `TodoItem:${variables.id}`;
  //     // const fragment = gql`
  //     //   fragment completeTodo on TodoItem {
  //     //     completed
  //     //   }
  //     // `;
  //     // const todo = cache.readFragment({ fragment, id });
  //     // const data = { ...todo, completed: !todo.completed };
  //     // cache.writeData({ id, data });
  //     cache.writeData({ data: { visibilityFilter: 'SHOW_NONE' } });
  //     return null;
  //   },
  // },
};
