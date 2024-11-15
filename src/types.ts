
export type TRPCContext = {
  userVisited: () => void
}

export type User = { id: number, user: string };

export type userList = () => User[];
export type userById = (id: number) => User;
export type userCreate = (data: Exclude<User, "id">) => User;