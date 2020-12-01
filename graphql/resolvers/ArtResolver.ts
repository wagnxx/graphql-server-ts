import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  InputType,
  Field,
  Subscription,
  Publisher,
  PubSub,
  Root,
  ObjectType,
  Args,
} from 'type-graphql';

@ObjectType()
class Arts {
  @Field()
  id: number;
  @Field()
  created_id: number;
  @Field()
  title: string;
}
@InputType()
class ArtGraphType {
  @Field()
  title: string;

  @Field(() => Int)
  created_id: number;
}
export const listArts: Arts[] = [
  {
    id: 1,
    created_id: 1,
    title: 'title1',
  },
];

@Resolver()
export class ArtResolver {
  @Query(() => [Arts])
  async arts() {
    return listArts;
  }

  @Mutation(() => Arts)
  async getArtById() {
    return listArts;
  }

  @Mutation(() => Boolean)
  async updateItem(
    @PubSub('UPDATE_ITEM') publish: Publisher<Arts>,
    @Arg('title') title: string,
    @Arg('id') id: number
  ) {
    let itemArt = listArts.find((art) => art.id == id);
    itemArt.title = title;
    await publish(itemArt);

    return true;
  }

  @Mutation(() => Boolean)
  async addItem(@PubSub('ADD_ITEM') publish: Publisher<Arts[]>) {
    let len = listArts.length;
    let itemArt = {
      id: len,
      created_id: 1,
      title: 'title' + len,
    };
    listArts.push(itemArt);

    await publish(listArts);

    return true;
  }

  @Subscription((returns) => [Arts], {
    topics: 'ADD_ITEM',
  })
  async itemAdd(@Root() arts: Arts[]) {
    return arts;
  }
  @Subscription((returns) => Arts, {
    topics: 'UPDATE_ITEM',
  })
  async itemUpdate(@Root() art: Arts) {
    return art;
  }
}
