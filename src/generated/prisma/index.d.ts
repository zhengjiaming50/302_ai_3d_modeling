
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Image
 * 
 */
export type Image = $Result.DefaultSelection<Prisma.$ImagePayload>
/**
 * Model Model
 * 
 */
export type Model = $Result.DefaultSelection<Prisma.$ModelPayload>
/**
 * Model AITag
 * 
 */
export type AITag = $Result.DefaultSelection<Prisma.$AITagPayload>
/**
 * Model AITagImage
 * 
 */
export type AITagImage = $Result.DefaultSelection<Prisma.$AITagImagePayload>
/**
 * Model ImageTag
 * 
 */
export type ImageTag = $Result.DefaultSelection<Prisma.$ImageTagPayload>
/**
 * Model Comparison
 * 
 */
export type Comparison = $Result.DefaultSelection<Prisma.$ComparisonPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Images
 * const images = await prisma.image.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Images
   * const images = await prisma.image.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.image`: Exposes CRUD operations for the **Image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.ImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.model`: Exposes CRUD operations for the **Model** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Models
    * const models = await prisma.model.findMany()
    * ```
    */
  get model(): Prisma.ModelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aITag`: Exposes CRUD operations for the **AITag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AITags
    * const aITags = await prisma.aITag.findMany()
    * ```
    */
  get aITag(): Prisma.AITagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aITagImage`: Exposes CRUD operations for the **AITagImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AITagImages
    * const aITagImages = await prisma.aITagImage.findMany()
    * ```
    */
  get aITagImage(): Prisma.AITagImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.imageTag`: Exposes CRUD operations for the **ImageTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImageTags
    * const imageTags = await prisma.imageTag.findMany()
    * ```
    */
  get imageTag(): Prisma.ImageTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comparison`: Exposes CRUD operations for the **Comparison** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comparisons
    * const comparisons = await prisma.comparison.findMany()
    * ```
    */
  get comparison(): Prisma.ComparisonDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Image: 'Image',
    Model: 'Model',
    AITag: 'AITag',
    AITagImage: 'AITagImage',
    ImageTag: 'ImageTag',
    Comparison: 'Comparison'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "image" | "model" | "aITag" | "aITagImage" | "imageTag" | "comparison"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Image: {
        payload: Prisma.$ImagePayload<ExtArgs>
        fields: Prisma.ImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findFirst: {
            args: Prisma.ImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findMany: {
            args: Prisma.ImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          create: {
            args: Prisma.ImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          createMany: {
            args: Prisma.ImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          delete: {
            args: Prisma.ImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          update: {
            args: Prisma.ImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          deleteMany: {
            args: Prisma.ImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          upsert: {
            args: Prisma.ImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          aggregate: {
            args: Prisma.ImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImage>
          }
          groupBy: {
            args: Prisma.ImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImageCountArgs<ExtArgs>
            result: $Utils.Optional<ImageCountAggregateOutputType> | number
          }
        }
      }
      Model: {
        payload: Prisma.$ModelPayload<ExtArgs>
        fields: Prisma.ModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          findFirst: {
            args: Prisma.ModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          findMany: {
            args: Prisma.ModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>[]
          }
          create: {
            args: Prisma.ModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          createMany: {
            args: Prisma.ModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>[]
          }
          delete: {
            args: Prisma.ModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          update: {
            args: Prisma.ModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          deleteMany: {
            args: Prisma.ModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>[]
          }
          upsert: {
            args: Prisma.ModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          aggregate: {
            args: Prisma.ModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModel>
          }
          groupBy: {
            args: Prisma.ModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModelCountArgs<ExtArgs>
            result: $Utils.Optional<ModelCountAggregateOutputType> | number
          }
        }
      }
      AITag: {
        payload: Prisma.$AITagPayload<ExtArgs>
        fields: Prisma.AITagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AITagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AITagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload>
          }
          findFirst: {
            args: Prisma.AITagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AITagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload>
          }
          findMany: {
            args: Prisma.AITagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload>[]
          }
          create: {
            args: Prisma.AITagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload>
          }
          createMany: {
            args: Prisma.AITagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AITagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload>[]
          }
          delete: {
            args: Prisma.AITagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload>
          }
          update: {
            args: Prisma.AITagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload>
          }
          deleteMany: {
            args: Prisma.AITagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AITagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AITagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload>[]
          }
          upsert: {
            args: Prisma.AITagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagPayload>
          }
          aggregate: {
            args: Prisma.AITagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAITag>
          }
          groupBy: {
            args: Prisma.AITagGroupByArgs<ExtArgs>
            result: $Utils.Optional<AITagGroupByOutputType>[]
          }
          count: {
            args: Prisma.AITagCountArgs<ExtArgs>
            result: $Utils.Optional<AITagCountAggregateOutputType> | number
          }
        }
      }
      AITagImage: {
        payload: Prisma.$AITagImagePayload<ExtArgs>
        fields: Prisma.AITagImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AITagImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AITagImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload>
          }
          findFirst: {
            args: Prisma.AITagImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AITagImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload>
          }
          findMany: {
            args: Prisma.AITagImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload>[]
          }
          create: {
            args: Prisma.AITagImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload>
          }
          createMany: {
            args: Prisma.AITagImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AITagImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload>[]
          }
          delete: {
            args: Prisma.AITagImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload>
          }
          update: {
            args: Prisma.AITagImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload>
          }
          deleteMany: {
            args: Prisma.AITagImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AITagImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AITagImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload>[]
          }
          upsert: {
            args: Prisma.AITagImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITagImagePayload>
          }
          aggregate: {
            args: Prisma.AITagImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAITagImage>
          }
          groupBy: {
            args: Prisma.AITagImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AITagImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AITagImageCountArgs<ExtArgs>
            result: $Utils.Optional<AITagImageCountAggregateOutputType> | number
          }
        }
      }
      ImageTag: {
        payload: Prisma.$ImageTagPayload<ExtArgs>
        fields: Prisma.ImageTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload>
          }
          findFirst: {
            args: Prisma.ImageTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload>
          }
          findMany: {
            args: Prisma.ImageTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload>[]
          }
          create: {
            args: Prisma.ImageTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload>
          }
          createMany: {
            args: Prisma.ImageTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImageTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload>[]
          }
          delete: {
            args: Prisma.ImageTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload>
          }
          update: {
            args: Prisma.ImageTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload>
          }
          deleteMany: {
            args: Prisma.ImageTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImageTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImageTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload>[]
          }
          upsert: {
            args: Prisma.ImageTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageTagPayload>
          }
          aggregate: {
            args: Prisma.ImageTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImageTag>
          }
          groupBy: {
            args: Prisma.ImageTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImageTagCountArgs<ExtArgs>
            result: $Utils.Optional<ImageTagCountAggregateOutputType> | number
          }
        }
      }
      Comparison: {
        payload: Prisma.$ComparisonPayload<ExtArgs>
        fields: Prisma.ComparisonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComparisonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComparisonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload>
          }
          findFirst: {
            args: Prisma.ComparisonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComparisonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload>
          }
          findMany: {
            args: Prisma.ComparisonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload>[]
          }
          create: {
            args: Prisma.ComparisonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload>
          }
          createMany: {
            args: Prisma.ComparisonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComparisonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload>[]
          }
          delete: {
            args: Prisma.ComparisonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload>
          }
          update: {
            args: Prisma.ComparisonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload>
          }
          deleteMany: {
            args: Prisma.ComparisonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComparisonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComparisonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload>[]
          }
          upsert: {
            args: Prisma.ComparisonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComparisonPayload>
          }
          aggregate: {
            args: Prisma.ComparisonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComparison>
          }
          groupBy: {
            args: Prisma.ComparisonGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComparisonGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComparisonCountArgs<ExtArgs>
            result: $Utils.Optional<ComparisonCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    image?: ImageOmit
    model?: ModelOmit
    aITag?: AITagOmit
    aITagImage?: AITagImageOmit
    imageTag?: ImageTagOmit
    comparison?: ComparisonOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ImageCountOutputType
   */

  export type ImageCountOutputType = {
    tags: number
    aiTags: number
    comparisons: number
  }

  export type ImageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | ImageCountOutputTypeCountTagsArgs
    aiTags?: boolean | ImageCountOutputTypeCountAiTagsArgs
    comparisons?: boolean | ImageCountOutputTypeCountComparisonsArgs
  }

  // Custom InputTypes
  /**
   * ImageCountOutputType without action
   */
  export type ImageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageCountOutputType
     */
    select?: ImageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ImageCountOutputType without action
   */
  export type ImageCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageTagWhereInput
  }

  /**
   * ImageCountOutputType without action
   */
  export type ImageCountOutputTypeCountAiTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITagImageWhereInput
  }

  /**
   * ImageCountOutputType without action
   */
  export type ImageCountOutputTypeCountComparisonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComparisonWhereInput
  }


  /**
   * Count Type ModelCountOutputType
   */

  export type ModelCountOutputType = {
    comparisons: number
  }

  export type ModelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comparisons?: boolean | ModelCountOutputTypeCountComparisonsArgs
  }

  // Custom InputTypes
  /**
   * ModelCountOutputType without action
   */
  export type ModelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelCountOutputType
     */
    select?: ModelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ModelCountOutputType without action
   */
  export type ModelCountOutputTypeCountComparisonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComparisonWhereInput
  }


  /**
   * Count Type AITagCountOutputType
   */

  export type AITagCountOutputType = {
    images: number
  }

  export type AITagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | AITagCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * AITagCountOutputType without action
   */
  export type AITagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagCountOutputType
     */
    select?: AITagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AITagCountOutputType without action
   */
  export type AITagCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITagImageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Image
   */

  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageAvgAggregateOutputType = {
    size: number | null
  }

  export type ImageSumAggregateOutputType = {
    size: number | null
  }

  export type ImageMinAggregateOutputType = {
    id: string | null
    fileName: string | null
    fileUrl: string | null
    mimeType: string | null
    size: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ImageMaxAggregateOutputType = {
    id: string | null
    fileName: string | null
    fileUrl: string | null
    mimeType: string | null
    size: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ImageCountAggregateOutputType = {
    id: number
    fileName: number
    fileUrl: number
    mimeType: number
    size: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ImageAvgAggregateInputType = {
    size?: true
  }

  export type ImageSumAggregateInputType = {
    size?: true
  }

  export type ImageMinAggregateInputType = {
    id?: true
    fileName?: true
    fileUrl?: true
    mimeType?: true
    size?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ImageMaxAggregateInputType = {
    id?: true
    fileName?: true
    fileUrl?: true
    mimeType?: true
    size?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ImageCountAggregateInputType = {
    id?: true
    fileName?: true
    fileUrl?: true
    mimeType?: true
    size?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Image to aggregate.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type ImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithAggregationInput | ImageOrderByWithAggregationInput[]
    by: ImageScalarFieldEnum[] | ImageScalarFieldEnum
    having?: ImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _avg?: ImageAvgAggregateInputType
    _sum?: ImageSumAggregateInputType
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }

  export type ImageGroupByOutputType = {
    id: string
    fileName: string
    fileUrl: string
    mimeType: string | null
    size: number | null
    createdAt: Date
    updatedAt: Date
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends ImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type ImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    mimeType?: boolean
    size?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | Image$modelArgs<ExtArgs>
    tags?: boolean | Image$tagsArgs<ExtArgs>
    aiTags?: boolean | Image$aiTagsArgs<ExtArgs>
    comparisons?: boolean | Image$comparisonsArgs<ExtArgs>
    _count?: boolean | ImageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["image"]>

  export type ImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    mimeType?: boolean
    size?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["image"]>

  export type ImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    mimeType?: boolean
    size?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["image"]>

  export type ImageSelectScalar = {
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    mimeType?: boolean
    size?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileName" | "fileUrl" | "mimeType" | "size" | "createdAt" | "updatedAt", ExtArgs["result"]["image"]>
  export type ImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | Image$modelArgs<ExtArgs>
    tags?: boolean | Image$tagsArgs<ExtArgs>
    aiTags?: boolean | Image$aiTagsArgs<ExtArgs>
    comparisons?: boolean | Image$comparisonsArgs<ExtArgs>
    _count?: boolean | ImageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Image"
    objects: {
      model: Prisma.$ModelPayload<ExtArgs> | null
      tags: Prisma.$ImageTagPayload<ExtArgs>[]
      aiTags: Prisma.$AITagImagePayload<ExtArgs>[]
      comparisons: Prisma.$ComparisonPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileName: string
      fileUrl: string
      mimeType: string | null
      size: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["image"]>
    composites: {}
  }

  type ImageGetPayload<S extends boolean | null | undefined | ImageDefaultArgs> = $Result.GetResult<Prisma.$ImagePayload, S>

  type ImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageCountAggregateInputType | true
    }

  export interface ImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Image'], meta: { name: 'Image' } }
    /**
     * Find zero or one Image that matches the filter.
     * @param {ImageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImageFindUniqueArgs>(args: SelectSubset<T, ImageFindUniqueArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Image that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImageFindFirstArgs>(args?: SelectSubset<T, ImageFindFirstArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImageFindManyArgs>(args?: SelectSubset<T, ImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Image.
     * @param {ImageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
     */
    create<T extends ImageCreateArgs>(args: SelectSubset<T, ImageCreateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Images.
     * @param {ImageCreateManyArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImageCreateManyArgs>(args?: SelectSubset<T, ImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Images and returns the data saved in the database.
     * @param {ImageCreateManyAndReturnArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Image.
     * @param {ImageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
     */
    delete<T extends ImageDeleteArgs>(args: SelectSubset<T, ImageDeleteArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Image.
     * @param {ImageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImageUpdateArgs>(args: SelectSubset<T, ImageUpdateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Images.
     * @param {ImageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImageDeleteManyArgs>(args?: SelectSubset<T, ImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImageUpdateManyArgs>(args: SelectSubset<T, ImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images and returns the data updated in the database.
     * @param {ImageUpdateManyAndReturnArgs} args - Arguments to update many Images.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Image.
     * @param {ImageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
     */
    upsert<T extends ImageUpsertArgs>(args: SelectSubset<T, ImageUpsertArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends ImageCountArgs>(
      args?: Subset<T, ImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageGroupByArgs['orderBy'] }
        : { orderBy?: ImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Image model
   */
  readonly fields: ImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    model<T extends Image$modelArgs<ExtArgs> = {}>(args?: Subset<T, Image$modelArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tags<T extends Image$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Image$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aiTags<T extends Image$aiTagsArgs<ExtArgs> = {}>(args?: Subset<T, Image$aiTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comparisons<T extends Image$comparisonsArgs<ExtArgs> = {}>(args?: Subset<T, Image$comparisonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Image model
   */
  interface ImageFieldRefs {
    readonly id: FieldRef<"Image", 'String'>
    readonly fileName: FieldRef<"Image", 'String'>
    readonly fileUrl: FieldRef<"Image", 'String'>
    readonly mimeType: FieldRef<"Image", 'String'>
    readonly size: FieldRef<"Image", 'Int'>
    readonly createdAt: FieldRef<"Image", 'DateTime'>
    readonly updatedAt: FieldRef<"Image", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Image findUnique
   */
  export type ImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findUniqueOrThrow
   */
  export type ImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findFirst
   */
  export type ImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findFirstOrThrow
   */
  export type ImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findMany
   */
  export type ImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Images to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image create
   */
  export type ImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The data needed to create a Image.
     */
    data: XOR<ImageCreateInput, ImageUncheckedCreateInput>
  }

  /**
   * Image createMany
   */
  export type ImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
  }

  /**
   * Image createManyAndReturn
   */
  export type ImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
  }

  /**
   * Image update
   */
  export type ImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The data needed to update a Image.
     */
    data: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
    /**
     * Choose, which Image to update.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image updateMany
   */
  export type ImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
  }

  /**
   * Image updateManyAndReturn
   */
  export type ImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
  }

  /**
   * Image upsert
   */
  export type ImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The filter to search for the Image to update in case it exists.
     */
    where: ImageWhereUniqueInput
    /**
     * In case the Image found by the `where` argument doesn't exist, create a new Image with this data.
     */
    create: XOR<ImageCreateInput, ImageUncheckedCreateInput>
    /**
     * In case the Image was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
  }

  /**
   * Image delete
   */
  export type ImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter which Image to delete.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image deleteMany
   */
  export type ImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Images to delete
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to delete.
     */
    limit?: number
  }

  /**
   * Image.model
   */
  export type Image$modelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    where?: ModelWhereInput
  }

  /**
   * Image.tags
   */
  export type Image$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    where?: ImageTagWhereInput
    orderBy?: ImageTagOrderByWithRelationInput | ImageTagOrderByWithRelationInput[]
    cursor?: ImageTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImageTagScalarFieldEnum | ImageTagScalarFieldEnum[]
  }

  /**
   * Image.aiTags
   */
  export type Image$aiTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    where?: AITagImageWhereInput
    orderBy?: AITagImageOrderByWithRelationInput | AITagImageOrderByWithRelationInput[]
    cursor?: AITagImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AITagImageScalarFieldEnum | AITagImageScalarFieldEnum[]
  }

  /**
   * Image.comparisons
   */
  export type Image$comparisonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    where?: ComparisonWhereInput
    orderBy?: ComparisonOrderByWithRelationInput | ComparisonOrderByWithRelationInput[]
    cursor?: ComparisonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComparisonScalarFieldEnum | ComparisonScalarFieldEnum[]
  }

  /**
   * Image without action
   */
  export type ImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
  }


  /**
   * Model Model
   */

  export type AggregateModel = {
    _count: ModelCountAggregateOutputType | null
    _avg: ModelAvgAggregateOutputType | null
    _sum: ModelSumAggregateOutputType | null
    _min: ModelMinAggregateOutputType | null
    _max: ModelMaxAggregateOutputType | null
  }

  export type ModelAvgAggregateOutputType = {
    size: number | null
  }

  export type ModelSumAggregateOutputType = {
    size: number | null
  }

  export type ModelMinAggregateOutputType = {
    id: string | null
    fileName: string | null
    fileUrl: string | null
    format: string | null
    size: number | null
    parameters: string | null
    createdAt: Date | null
    updatedAt: Date | null
    imageId: string | null
  }

  export type ModelMaxAggregateOutputType = {
    id: string | null
    fileName: string | null
    fileUrl: string | null
    format: string | null
    size: number | null
    parameters: string | null
    createdAt: Date | null
    updatedAt: Date | null
    imageId: string | null
  }

  export type ModelCountAggregateOutputType = {
    id: number
    fileName: number
    fileUrl: number
    format: number
    size: number
    parameters: number
    createdAt: number
    updatedAt: number
    imageId: number
    _all: number
  }


  export type ModelAvgAggregateInputType = {
    size?: true
  }

  export type ModelSumAggregateInputType = {
    size?: true
  }

  export type ModelMinAggregateInputType = {
    id?: true
    fileName?: true
    fileUrl?: true
    format?: true
    size?: true
    parameters?: true
    createdAt?: true
    updatedAt?: true
    imageId?: true
  }

  export type ModelMaxAggregateInputType = {
    id?: true
    fileName?: true
    fileUrl?: true
    format?: true
    size?: true
    parameters?: true
    createdAt?: true
    updatedAt?: true
    imageId?: true
  }

  export type ModelCountAggregateInputType = {
    id?: true
    fileName?: true
    fileUrl?: true
    format?: true
    size?: true
    parameters?: true
    createdAt?: true
    updatedAt?: true
    imageId?: true
    _all?: true
  }

  export type ModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Model to aggregate.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Models
    **/
    _count?: true | ModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModelMaxAggregateInputType
  }

  export type GetModelAggregateType<T extends ModelAggregateArgs> = {
        [P in keyof T & keyof AggregateModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModel[P]>
      : GetScalarType<T[P], AggregateModel[P]>
  }




  export type ModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModelWhereInput
    orderBy?: ModelOrderByWithAggregationInput | ModelOrderByWithAggregationInput[]
    by: ModelScalarFieldEnum[] | ModelScalarFieldEnum
    having?: ModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModelCountAggregateInputType | true
    _avg?: ModelAvgAggregateInputType
    _sum?: ModelSumAggregateInputType
    _min?: ModelMinAggregateInputType
    _max?: ModelMaxAggregateInputType
  }

  export type ModelGroupByOutputType = {
    id: string
    fileName: string
    fileUrl: string
    format: string | null
    size: number | null
    parameters: string | null
    createdAt: Date
    updatedAt: Date
    imageId: string
    _count: ModelCountAggregateOutputType | null
    _avg: ModelAvgAggregateOutputType | null
    _sum: ModelSumAggregateOutputType | null
    _min: ModelMinAggregateOutputType | null
    _max: ModelMaxAggregateOutputType | null
  }

  type GetModelGroupByPayload<T extends ModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModelGroupByOutputType[P]>
            : GetScalarType<T[P], ModelGroupByOutputType[P]>
        }
      >
    >


  export type ModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    format?: boolean
    size?: boolean
    parameters?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    imageId?: boolean
    image?: boolean | ImageDefaultArgs<ExtArgs>
    comparisons?: boolean | Model$comparisonsArgs<ExtArgs>
    _count?: boolean | ModelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["model"]>

  export type ModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    format?: boolean
    size?: boolean
    parameters?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    imageId?: boolean
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["model"]>

  export type ModelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    format?: boolean
    size?: boolean
    parameters?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    imageId?: boolean
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["model"]>

  export type ModelSelectScalar = {
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    format?: boolean
    size?: boolean
    parameters?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    imageId?: boolean
  }

  export type ModelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileName" | "fileUrl" | "format" | "size" | "parameters" | "createdAt" | "updatedAt" | "imageId", ExtArgs["result"]["model"]>
  export type ModelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageDefaultArgs<ExtArgs>
    comparisons?: boolean | Model$comparisonsArgs<ExtArgs>
    _count?: boolean | ModelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ModelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }
  export type ModelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }

  export type $ModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Model"
    objects: {
      image: Prisma.$ImagePayload<ExtArgs>
      comparisons: Prisma.$ComparisonPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileName: string
      fileUrl: string
      format: string | null
      size: number | null
      parameters: string | null
      createdAt: Date
      updatedAt: Date
      imageId: string
    }, ExtArgs["result"]["model"]>
    composites: {}
  }

  type ModelGetPayload<S extends boolean | null | undefined | ModelDefaultArgs> = $Result.GetResult<Prisma.$ModelPayload, S>

  type ModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModelCountAggregateInputType | true
    }

  export interface ModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Model'], meta: { name: 'Model' } }
    /**
     * Find zero or one Model that matches the filter.
     * @param {ModelFindUniqueArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModelFindUniqueArgs>(args: SelectSubset<T, ModelFindUniqueArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Model that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModelFindUniqueOrThrowArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModelFindUniqueOrThrowArgs>(args: SelectSubset<T, ModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Model that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFindFirstArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModelFindFirstArgs>(args?: SelectSubset<T, ModelFindFirstArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Model that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFindFirstOrThrowArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModelFindFirstOrThrowArgs>(args?: SelectSubset<T, ModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Models that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Models
     * const models = await prisma.model.findMany()
     * 
     * // Get first 10 Models
     * const models = await prisma.model.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modelWithIdOnly = await prisma.model.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModelFindManyArgs>(args?: SelectSubset<T, ModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Model.
     * @param {ModelCreateArgs} args - Arguments to create a Model.
     * @example
     * // Create one Model
     * const Model = await prisma.model.create({
     *   data: {
     *     // ... data to create a Model
     *   }
     * })
     * 
     */
    create<T extends ModelCreateArgs>(args: SelectSubset<T, ModelCreateArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Models.
     * @param {ModelCreateManyArgs} args - Arguments to create many Models.
     * @example
     * // Create many Models
     * const model = await prisma.model.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModelCreateManyArgs>(args?: SelectSubset<T, ModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Models and returns the data saved in the database.
     * @param {ModelCreateManyAndReturnArgs} args - Arguments to create many Models.
     * @example
     * // Create many Models
     * const model = await prisma.model.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Models and only return the `id`
     * const modelWithIdOnly = await prisma.model.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModelCreateManyAndReturnArgs>(args?: SelectSubset<T, ModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Model.
     * @param {ModelDeleteArgs} args - Arguments to delete one Model.
     * @example
     * // Delete one Model
     * const Model = await prisma.model.delete({
     *   where: {
     *     // ... filter to delete one Model
     *   }
     * })
     * 
     */
    delete<T extends ModelDeleteArgs>(args: SelectSubset<T, ModelDeleteArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Model.
     * @param {ModelUpdateArgs} args - Arguments to update one Model.
     * @example
     * // Update one Model
     * const model = await prisma.model.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModelUpdateArgs>(args: SelectSubset<T, ModelUpdateArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Models.
     * @param {ModelDeleteManyArgs} args - Arguments to filter Models to delete.
     * @example
     * // Delete a few Models
     * const { count } = await prisma.model.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModelDeleteManyArgs>(args?: SelectSubset<T, ModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Models.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Models
     * const model = await prisma.model.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModelUpdateManyArgs>(args: SelectSubset<T, ModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Models and returns the data updated in the database.
     * @param {ModelUpdateManyAndReturnArgs} args - Arguments to update many Models.
     * @example
     * // Update many Models
     * const model = await prisma.model.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Models and only return the `id`
     * const modelWithIdOnly = await prisma.model.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModelUpdateManyAndReturnArgs>(args: SelectSubset<T, ModelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Model.
     * @param {ModelUpsertArgs} args - Arguments to update or create a Model.
     * @example
     * // Update or create a Model
     * const model = await prisma.model.upsert({
     *   create: {
     *     // ... data to create a Model
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Model we want to update
     *   }
     * })
     */
    upsert<T extends ModelUpsertArgs>(args: SelectSubset<T, ModelUpsertArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Models.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelCountArgs} args - Arguments to filter Models to count.
     * @example
     * // Count the number of Models
     * const count = await prisma.model.count({
     *   where: {
     *     // ... the filter for the Models we want to count
     *   }
     * })
    **/
    count<T extends ModelCountArgs>(
      args?: Subset<T, ModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Model.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModelAggregateArgs>(args: Subset<T, ModelAggregateArgs>): Prisma.PrismaPromise<GetModelAggregateType<T>>

    /**
     * Group by Model.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModelGroupByArgs['orderBy'] }
        : { orderBy?: ModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Model model
   */
  readonly fields: ModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Model.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    image<T extends ImageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImageDefaultArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comparisons<T extends Model$comparisonsArgs<ExtArgs> = {}>(args?: Subset<T, Model$comparisonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Model model
   */
  interface ModelFieldRefs {
    readonly id: FieldRef<"Model", 'String'>
    readonly fileName: FieldRef<"Model", 'String'>
    readonly fileUrl: FieldRef<"Model", 'String'>
    readonly format: FieldRef<"Model", 'String'>
    readonly size: FieldRef<"Model", 'Int'>
    readonly parameters: FieldRef<"Model", 'String'>
    readonly createdAt: FieldRef<"Model", 'DateTime'>
    readonly updatedAt: FieldRef<"Model", 'DateTime'>
    readonly imageId: FieldRef<"Model", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Model findUnique
   */
  export type ModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where: ModelWhereUniqueInput
  }

  /**
   * Model findUniqueOrThrow
   */
  export type ModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where: ModelWhereUniqueInput
  }

  /**
   * Model findFirst
   */
  export type ModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Models.
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Models.
     */
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }

  /**
   * Model findFirstOrThrow
   */
  export type ModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Models.
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Models.
     */
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }

  /**
   * Model findMany
   */
  export type ModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Models to fetch.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Models.
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }

  /**
   * Model create
   */
  export type ModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * The data needed to create a Model.
     */
    data: XOR<ModelCreateInput, ModelUncheckedCreateInput>
  }

  /**
   * Model createMany
   */
  export type ModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Models.
     */
    data: ModelCreateManyInput | ModelCreateManyInput[]
  }

  /**
   * Model createManyAndReturn
   */
  export type ModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * The data used to create many Models.
     */
    data: ModelCreateManyInput | ModelCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Model update
   */
  export type ModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * The data needed to update a Model.
     */
    data: XOR<ModelUpdateInput, ModelUncheckedUpdateInput>
    /**
     * Choose, which Model to update.
     */
    where: ModelWhereUniqueInput
  }

  /**
   * Model updateMany
   */
  export type ModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Models.
     */
    data: XOR<ModelUpdateManyMutationInput, ModelUncheckedUpdateManyInput>
    /**
     * Filter which Models to update
     */
    where?: ModelWhereInput
    /**
     * Limit how many Models to update.
     */
    limit?: number
  }

  /**
   * Model updateManyAndReturn
   */
  export type ModelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * The data used to update Models.
     */
    data: XOR<ModelUpdateManyMutationInput, ModelUncheckedUpdateManyInput>
    /**
     * Filter which Models to update
     */
    where?: ModelWhereInput
    /**
     * Limit how many Models to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Model upsert
   */
  export type ModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * The filter to search for the Model to update in case it exists.
     */
    where: ModelWhereUniqueInput
    /**
     * In case the Model found by the `where` argument doesn't exist, create a new Model with this data.
     */
    create: XOR<ModelCreateInput, ModelUncheckedCreateInput>
    /**
     * In case the Model was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModelUpdateInput, ModelUncheckedUpdateInput>
  }

  /**
   * Model delete
   */
  export type ModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter which Model to delete.
     */
    where: ModelWhereUniqueInput
  }

  /**
   * Model deleteMany
   */
  export type ModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Models to delete
     */
    where?: ModelWhereInput
    /**
     * Limit how many Models to delete.
     */
    limit?: number
  }

  /**
   * Model.comparisons
   */
  export type Model$comparisonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    where?: ComparisonWhereInput
    orderBy?: ComparisonOrderByWithRelationInput | ComparisonOrderByWithRelationInput[]
    cursor?: ComparisonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComparisonScalarFieldEnum | ComparisonScalarFieldEnum[]
  }

  /**
   * Model without action
   */
  export type ModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
  }


  /**
   * Model AITag
   */

  export type AggregateAITag = {
    _count: AITagCountAggregateOutputType | null
    _min: AITagMinAggregateOutputType | null
    _max: AITagMaxAggregateOutputType | null
  }

  export type AITagMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AITagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AITagCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AITagMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AITagMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AITagCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AITagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITag to aggregate.
     */
    where?: AITagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITags to fetch.
     */
    orderBy?: AITagOrderByWithRelationInput | AITagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AITagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AITags
    **/
    _count?: true | AITagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AITagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AITagMaxAggregateInputType
  }

  export type GetAITagAggregateType<T extends AITagAggregateArgs> = {
        [P in keyof T & keyof AggregateAITag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAITag[P]>
      : GetScalarType<T[P], AggregateAITag[P]>
  }




  export type AITagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITagWhereInput
    orderBy?: AITagOrderByWithAggregationInput | AITagOrderByWithAggregationInput[]
    by: AITagScalarFieldEnum[] | AITagScalarFieldEnum
    having?: AITagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AITagCountAggregateInputType | true
    _min?: AITagMinAggregateInputType
    _max?: AITagMaxAggregateInputType
  }

  export type AITagGroupByOutputType = {
    id: string
    name: string
    description: string | null
    category: string | null
    createdAt: Date
    updatedAt: Date
    _count: AITagCountAggregateOutputType | null
    _min: AITagMinAggregateOutputType | null
    _max: AITagMaxAggregateOutputType | null
  }

  type GetAITagGroupByPayload<T extends AITagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AITagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AITagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AITagGroupByOutputType[P]>
            : GetScalarType<T[P], AITagGroupByOutputType[P]>
        }
      >
    >


  export type AITagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    images?: boolean | AITag$imagesArgs<ExtArgs>
    _count?: boolean | AITagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITag"]>

  export type AITagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aITag"]>

  export type AITagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aITag"]>

  export type AITagSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AITagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "category" | "createdAt" | "updatedAt", ExtArgs["result"]["aITag"]>
  export type AITagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | AITag$imagesArgs<ExtArgs>
    _count?: boolean | AITagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AITagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AITagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AITagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AITag"
    objects: {
      images: Prisma.$AITagImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      category: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aITag"]>
    composites: {}
  }

  type AITagGetPayload<S extends boolean | null | undefined | AITagDefaultArgs> = $Result.GetResult<Prisma.$AITagPayload, S>

  type AITagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AITagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AITagCountAggregateInputType | true
    }

  export interface AITagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AITag'], meta: { name: 'AITag' } }
    /**
     * Find zero or one AITag that matches the filter.
     * @param {AITagFindUniqueArgs} args - Arguments to find a AITag
     * @example
     * // Get one AITag
     * const aITag = await prisma.aITag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AITagFindUniqueArgs>(args: SelectSubset<T, AITagFindUniqueArgs<ExtArgs>>): Prisma__AITagClient<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AITag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AITagFindUniqueOrThrowArgs} args - Arguments to find a AITag
     * @example
     * // Get one AITag
     * const aITag = await prisma.aITag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AITagFindUniqueOrThrowArgs>(args: SelectSubset<T, AITagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AITagClient<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagFindFirstArgs} args - Arguments to find a AITag
     * @example
     * // Get one AITag
     * const aITag = await prisma.aITag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AITagFindFirstArgs>(args?: SelectSubset<T, AITagFindFirstArgs<ExtArgs>>): Prisma__AITagClient<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagFindFirstOrThrowArgs} args - Arguments to find a AITag
     * @example
     * // Get one AITag
     * const aITag = await prisma.aITag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AITagFindFirstOrThrowArgs>(args?: SelectSubset<T, AITagFindFirstOrThrowArgs<ExtArgs>>): Prisma__AITagClient<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AITags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AITags
     * const aITags = await prisma.aITag.findMany()
     * 
     * // Get first 10 AITags
     * const aITags = await prisma.aITag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aITagWithIdOnly = await prisma.aITag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AITagFindManyArgs>(args?: SelectSubset<T, AITagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AITag.
     * @param {AITagCreateArgs} args - Arguments to create a AITag.
     * @example
     * // Create one AITag
     * const AITag = await prisma.aITag.create({
     *   data: {
     *     // ... data to create a AITag
     *   }
     * })
     * 
     */
    create<T extends AITagCreateArgs>(args: SelectSubset<T, AITagCreateArgs<ExtArgs>>): Prisma__AITagClient<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AITags.
     * @param {AITagCreateManyArgs} args - Arguments to create many AITags.
     * @example
     * // Create many AITags
     * const aITag = await prisma.aITag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AITagCreateManyArgs>(args?: SelectSubset<T, AITagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AITags and returns the data saved in the database.
     * @param {AITagCreateManyAndReturnArgs} args - Arguments to create many AITags.
     * @example
     * // Create many AITags
     * const aITag = await prisma.aITag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AITags and only return the `id`
     * const aITagWithIdOnly = await prisma.aITag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AITagCreateManyAndReturnArgs>(args?: SelectSubset<T, AITagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AITag.
     * @param {AITagDeleteArgs} args - Arguments to delete one AITag.
     * @example
     * // Delete one AITag
     * const AITag = await prisma.aITag.delete({
     *   where: {
     *     // ... filter to delete one AITag
     *   }
     * })
     * 
     */
    delete<T extends AITagDeleteArgs>(args: SelectSubset<T, AITagDeleteArgs<ExtArgs>>): Prisma__AITagClient<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AITag.
     * @param {AITagUpdateArgs} args - Arguments to update one AITag.
     * @example
     * // Update one AITag
     * const aITag = await prisma.aITag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AITagUpdateArgs>(args: SelectSubset<T, AITagUpdateArgs<ExtArgs>>): Prisma__AITagClient<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AITags.
     * @param {AITagDeleteManyArgs} args - Arguments to filter AITags to delete.
     * @example
     * // Delete a few AITags
     * const { count } = await prisma.aITag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AITagDeleteManyArgs>(args?: SelectSubset<T, AITagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AITags
     * const aITag = await prisma.aITag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AITagUpdateManyArgs>(args: SelectSubset<T, AITagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITags and returns the data updated in the database.
     * @param {AITagUpdateManyAndReturnArgs} args - Arguments to update many AITags.
     * @example
     * // Update many AITags
     * const aITag = await prisma.aITag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AITags and only return the `id`
     * const aITagWithIdOnly = await prisma.aITag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AITagUpdateManyAndReturnArgs>(args: SelectSubset<T, AITagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AITag.
     * @param {AITagUpsertArgs} args - Arguments to update or create a AITag.
     * @example
     * // Update or create a AITag
     * const aITag = await prisma.aITag.upsert({
     *   create: {
     *     // ... data to create a AITag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AITag we want to update
     *   }
     * })
     */
    upsert<T extends AITagUpsertArgs>(args: SelectSubset<T, AITagUpsertArgs<ExtArgs>>): Prisma__AITagClient<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AITags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagCountArgs} args - Arguments to filter AITags to count.
     * @example
     * // Count the number of AITags
     * const count = await prisma.aITag.count({
     *   where: {
     *     // ... the filter for the AITags we want to count
     *   }
     * })
    **/
    count<T extends AITagCountArgs>(
      args?: Subset<T, AITagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AITagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AITag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AITagAggregateArgs>(args: Subset<T, AITagAggregateArgs>): Prisma.PrismaPromise<GetAITagAggregateType<T>>

    /**
     * Group by AITag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AITagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AITagGroupByArgs['orderBy'] }
        : { orderBy?: AITagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AITagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAITagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AITag model
   */
  readonly fields: AITagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AITag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AITagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    images<T extends AITag$imagesArgs<ExtArgs> = {}>(args?: Subset<T, AITag$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AITag model
   */
  interface AITagFieldRefs {
    readonly id: FieldRef<"AITag", 'String'>
    readonly name: FieldRef<"AITag", 'String'>
    readonly description: FieldRef<"AITag", 'String'>
    readonly category: FieldRef<"AITag", 'String'>
    readonly createdAt: FieldRef<"AITag", 'DateTime'>
    readonly updatedAt: FieldRef<"AITag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AITag findUnique
   */
  export type AITagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
    /**
     * Filter, which AITag to fetch.
     */
    where: AITagWhereUniqueInput
  }

  /**
   * AITag findUniqueOrThrow
   */
  export type AITagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
    /**
     * Filter, which AITag to fetch.
     */
    where: AITagWhereUniqueInput
  }

  /**
   * AITag findFirst
   */
  export type AITagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
    /**
     * Filter, which AITag to fetch.
     */
    where?: AITagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITags to fetch.
     */
    orderBy?: AITagOrderByWithRelationInput | AITagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITags.
     */
    cursor?: AITagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITags.
     */
    distinct?: AITagScalarFieldEnum | AITagScalarFieldEnum[]
  }

  /**
   * AITag findFirstOrThrow
   */
  export type AITagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
    /**
     * Filter, which AITag to fetch.
     */
    where?: AITagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITags to fetch.
     */
    orderBy?: AITagOrderByWithRelationInput | AITagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITags.
     */
    cursor?: AITagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITags.
     */
    distinct?: AITagScalarFieldEnum | AITagScalarFieldEnum[]
  }

  /**
   * AITag findMany
   */
  export type AITagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
    /**
     * Filter, which AITags to fetch.
     */
    where?: AITagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITags to fetch.
     */
    orderBy?: AITagOrderByWithRelationInput | AITagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AITags.
     */
    cursor?: AITagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITags.
     */
    skip?: number
    distinct?: AITagScalarFieldEnum | AITagScalarFieldEnum[]
  }

  /**
   * AITag create
   */
  export type AITagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
    /**
     * The data needed to create a AITag.
     */
    data: XOR<AITagCreateInput, AITagUncheckedCreateInput>
  }

  /**
   * AITag createMany
   */
  export type AITagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AITags.
     */
    data: AITagCreateManyInput | AITagCreateManyInput[]
  }

  /**
   * AITag createManyAndReturn
   */
  export type AITagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * The data used to create many AITags.
     */
    data: AITagCreateManyInput | AITagCreateManyInput[]
  }

  /**
   * AITag update
   */
  export type AITagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
    /**
     * The data needed to update a AITag.
     */
    data: XOR<AITagUpdateInput, AITagUncheckedUpdateInput>
    /**
     * Choose, which AITag to update.
     */
    where: AITagWhereUniqueInput
  }

  /**
   * AITag updateMany
   */
  export type AITagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AITags.
     */
    data: XOR<AITagUpdateManyMutationInput, AITagUncheckedUpdateManyInput>
    /**
     * Filter which AITags to update
     */
    where?: AITagWhereInput
    /**
     * Limit how many AITags to update.
     */
    limit?: number
  }

  /**
   * AITag updateManyAndReturn
   */
  export type AITagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * The data used to update AITags.
     */
    data: XOR<AITagUpdateManyMutationInput, AITagUncheckedUpdateManyInput>
    /**
     * Filter which AITags to update
     */
    where?: AITagWhereInput
    /**
     * Limit how many AITags to update.
     */
    limit?: number
  }

  /**
   * AITag upsert
   */
  export type AITagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
    /**
     * The filter to search for the AITag to update in case it exists.
     */
    where: AITagWhereUniqueInput
    /**
     * In case the AITag found by the `where` argument doesn't exist, create a new AITag with this data.
     */
    create: XOR<AITagCreateInput, AITagUncheckedCreateInput>
    /**
     * In case the AITag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AITagUpdateInput, AITagUncheckedUpdateInput>
  }

  /**
   * AITag delete
   */
  export type AITagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
    /**
     * Filter which AITag to delete.
     */
    where: AITagWhereUniqueInput
  }

  /**
   * AITag deleteMany
   */
  export type AITagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITags to delete
     */
    where?: AITagWhereInput
    /**
     * Limit how many AITags to delete.
     */
    limit?: number
  }

  /**
   * AITag.images
   */
  export type AITag$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    where?: AITagImageWhereInput
    orderBy?: AITagImageOrderByWithRelationInput | AITagImageOrderByWithRelationInput[]
    cursor?: AITagImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AITagImageScalarFieldEnum | AITagImageScalarFieldEnum[]
  }

  /**
   * AITag without action
   */
  export type AITagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITag
     */
    select?: AITagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITag
     */
    omit?: AITagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagInclude<ExtArgs> | null
  }


  /**
   * Model AITagImage
   */

  export type AggregateAITagImage = {
    _count: AITagImageCountAggregateOutputType | null
    _avg: AITagImageAvgAggregateOutputType | null
    _sum: AITagImageSumAggregateOutputType | null
    _min: AITagImageMinAggregateOutputType | null
    _max: AITagImageMaxAggregateOutputType | null
  }

  export type AITagImageAvgAggregateOutputType = {
    confidence: number | null
  }

  export type AITagImageSumAggregateOutputType = {
    confidence: number | null
  }

  export type AITagImageMinAggregateOutputType = {
    id: string | null
    confidence: number | null
    createdAt: Date | null
    imageId: string | null
    tagId: string | null
  }

  export type AITagImageMaxAggregateOutputType = {
    id: string | null
    confidence: number | null
    createdAt: Date | null
    imageId: string | null
    tagId: string | null
  }

  export type AITagImageCountAggregateOutputType = {
    id: number
    confidence: number
    createdAt: number
    imageId: number
    tagId: number
    _all: number
  }


  export type AITagImageAvgAggregateInputType = {
    confidence?: true
  }

  export type AITagImageSumAggregateInputType = {
    confidence?: true
  }

  export type AITagImageMinAggregateInputType = {
    id?: true
    confidence?: true
    createdAt?: true
    imageId?: true
    tagId?: true
  }

  export type AITagImageMaxAggregateInputType = {
    id?: true
    confidence?: true
    createdAt?: true
    imageId?: true
    tagId?: true
  }

  export type AITagImageCountAggregateInputType = {
    id?: true
    confidence?: true
    createdAt?: true
    imageId?: true
    tagId?: true
    _all?: true
  }

  export type AITagImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITagImage to aggregate.
     */
    where?: AITagImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITagImages to fetch.
     */
    orderBy?: AITagImageOrderByWithRelationInput | AITagImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AITagImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITagImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITagImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AITagImages
    **/
    _count?: true | AITagImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AITagImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AITagImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AITagImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AITagImageMaxAggregateInputType
  }

  export type GetAITagImageAggregateType<T extends AITagImageAggregateArgs> = {
        [P in keyof T & keyof AggregateAITagImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAITagImage[P]>
      : GetScalarType<T[P], AggregateAITagImage[P]>
  }




  export type AITagImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITagImageWhereInput
    orderBy?: AITagImageOrderByWithAggregationInput | AITagImageOrderByWithAggregationInput[]
    by: AITagImageScalarFieldEnum[] | AITagImageScalarFieldEnum
    having?: AITagImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AITagImageCountAggregateInputType | true
    _avg?: AITagImageAvgAggregateInputType
    _sum?: AITagImageSumAggregateInputType
    _min?: AITagImageMinAggregateInputType
    _max?: AITagImageMaxAggregateInputType
  }

  export type AITagImageGroupByOutputType = {
    id: string
    confidence: number
    createdAt: Date
    imageId: string
    tagId: string
    _count: AITagImageCountAggregateOutputType | null
    _avg: AITagImageAvgAggregateOutputType | null
    _sum: AITagImageSumAggregateOutputType | null
    _min: AITagImageMinAggregateOutputType | null
    _max: AITagImageMaxAggregateOutputType | null
  }

  type GetAITagImageGroupByPayload<T extends AITagImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AITagImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AITagImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AITagImageGroupByOutputType[P]>
            : GetScalarType<T[P], AITagImageGroupByOutputType[P]>
        }
      >
    >


  export type AITagImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    confidence?: boolean
    createdAt?: boolean
    imageId?: boolean
    tagId?: boolean
    image?: boolean | ImageDefaultArgs<ExtArgs>
    tag?: boolean | AITagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITagImage"]>

  export type AITagImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    confidence?: boolean
    createdAt?: boolean
    imageId?: boolean
    tagId?: boolean
    image?: boolean | ImageDefaultArgs<ExtArgs>
    tag?: boolean | AITagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITagImage"]>

  export type AITagImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    confidence?: boolean
    createdAt?: boolean
    imageId?: boolean
    tagId?: boolean
    image?: boolean | ImageDefaultArgs<ExtArgs>
    tag?: boolean | AITagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITagImage"]>

  export type AITagImageSelectScalar = {
    id?: boolean
    confidence?: boolean
    createdAt?: boolean
    imageId?: boolean
    tagId?: boolean
  }

  export type AITagImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "confidence" | "createdAt" | "imageId" | "tagId", ExtArgs["result"]["aITagImage"]>
  export type AITagImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageDefaultArgs<ExtArgs>
    tag?: boolean | AITagDefaultArgs<ExtArgs>
  }
  export type AITagImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageDefaultArgs<ExtArgs>
    tag?: boolean | AITagDefaultArgs<ExtArgs>
  }
  export type AITagImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageDefaultArgs<ExtArgs>
    tag?: boolean | AITagDefaultArgs<ExtArgs>
  }

  export type $AITagImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AITagImage"
    objects: {
      image: Prisma.$ImagePayload<ExtArgs>
      tag: Prisma.$AITagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      confidence: number
      createdAt: Date
      imageId: string
      tagId: string
    }, ExtArgs["result"]["aITagImage"]>
    composites: {}
  }

  type AITagImageGetPayload<S extends boolean | null | undefined | AITagImageDefaultArgs> = $Result.GetResult<Prisma.$AITagImagePayload, S>

  type AITagImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AITagImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AITagImageCountAggregateInputType | true
    }

  export interface AITagImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AITagImage'], meta: { name: 'AITagImage' } }
    /**
     * Find zero or one AITagImage that matches the filter.
     * @param {AITagImageFindUniqueArgs} args - Arguments to find a AITagImage
     * @example
     * // Get one AITagImage
     * const aITagImage = await prisma.aITagImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AITagImageFindUniqueArgs>(args: SelectSubset<T, AITagImageFindUniqueArgs<ExtArgs>>): Prisma__AITagImageClient<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AITagImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AITagImageFindUniqueOrThrowArgs} args - Arguments to find a AITagImage
     * @example
     * // Get one AITagImage
     * const aITagImage = await prisma.aITagImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AITagImageFindUniqueOrThrowArgs>(args: SelectSubset<T, AITagImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AITagImageClient<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITagImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagImageFindFirstArgs} args - Arguments to find a AITagImage
     * @example
     * // Get one AITagImage
     * const aITagImage = await prisma.aITagImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AITagImageFindFirstArgs>(args?: SelectSubset<T, AITagImageFindFirstArgs<ExtArgs>>): Prisma__AITagImageClient<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITagImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagImageFindFirstOrThrowArgs} args - Arguments to find a AITagImage
     * @example
     * // Get one AITagImage
     * const aITagImage = await prisma.aITagImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AITagImageFindFirstOrThrowArgs>(args?: SelectSubset<T, AITagImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AITagImageClient<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AITagImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AITagImages
     * const aITagImages = await prisma.aITagImage.findMany()
     * 
     * // Get first 10 AITagImages
     * const aITagImages = await prisma.aITagImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aITagImageWithIdOnly = await prisma.aITagImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AITagImageFindManyArgs>(args?: SelectSubset<T, AITagImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AITagImage.
     * @param {AITagImageCreateArgs} args - Arguments to create a AITagImage.
     * @example
     * // Create one AITagImage
     * const AITagImage = await prisma.aITagImage.create({
     *   data: {
     *     // ... data to create a AITagImage
     *   }
     * })
     * 
     */
    create<T extends AITagImageCreateArgs>(args: SelectSubset<T, AITagImageCreateArgs<ExtArgs>>): Prisma__AITagImageClient<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AITagImages.
     * @param {AITagImageCreateManyArgs} args - Arguments to create many AITagImages.
     * @example
     * // Create many AITagImages
     * const aITagImage = await prisma.aITagImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AITagImageCreateManyArgs>(args?: SelectSubset<T, AITagImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AITagImages and returns the data saved in the database.
     * @param {AITagImageCreateManyAndReturnArgs} args - Arguments to create many AITagImages.
     * @example
     * // Create many AITagImages
     * const aITagImage = await prisma.aITagImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AITagImages and only return the `id`
     * const aITagImageWithIdOnly = await prisma.aITagImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AITagImageCreateManyAndReturnArgs>(args?: SelectSubset<T, AITagImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AITagImage.
     * @param {AITagImageDeleteArgs} args - Arguments to delete one AITagImage.
     * @example
     * // Delete one AITagImage
     * const AITagImage = await prisma.aITagImage.delete({
     *   where: {
     *     // ... filter to delete one AITagImage
     *   }
     * })
     * 
     */
    delete<T extends AITagImageDeleteArgs>(args: SelectSubset<T, AITagImageDeleteArgs<ExtArgs>>): Prisma__AITagImageClient<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AITagImage.
     * @param {AITagImageUpdateArgs} args - Arguments to update one AITagImage.
     * @example
     * // Update one AITagImage
     * const aITagImage = await prisma.aITagImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AITagImageUpdateArgs>(args: SelectSubset<T, AITagImageUpdateArgs<ExtArgs>>): Prisma__AITagImageClient<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AITagImages.
     * @param {AITagImageDeleteManyArgs} args - Arguments to filter AITagImages to delete.
     * @example
     * // Delete a few AITagImages
     * const { count } = await prisma.aITagImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AITagImageDeleteManyArgs>(args?: SelectSubset<T, AITagImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITagImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AITagImages
     * const aITagImage = await prisma.aITagImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AITagImageUpdateManyArgs>(args: SelectSubset<T, AITagImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITagImages and returns the data updated in the database.
     * @param {AITagImageUpdateManyAndReturnArgs} args - Arguments to update many AITagImages.
     * @example
     * // Update many AITagImages
     * const aITagImage = await prisma.aITagImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AITagImages and only return the `id`
     * const aITagImageWithIdOnly = await prisma.aITagImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AITagImageUpdateManyAndReturnArgs>(args: SelectSubset<T, AITagImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AITagImage.
     * @param {AITagImageUpsertArgs} args - Arguments to update or create a AITagImage.
     * @example
     * // Update or create a AITagImage
     * const aITagImage = await prisma.aITagImage.upsert({
     *   create: {
     *     // ... data to create a AITagImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AITagImage we want to update
     *   }
     * })
     */
    upsert<T extends AITagImageUpsertArgs>(args: SelectSubset<T, AITagImageUpsertArgs<ExtArgs>>): Prisma__AITagImageClient<$Result.GetResult<Prisma.$AITagImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AITagImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagImageCountArgs} args - Arguments to filter AITagImages to count.
     * @example
     * // Count the number of AITagImages
     * const count = await prisma.aITagImage.count({
     *   where: {
     *     // ... the filter for the AITagImages we want to count
     *   }
     * })
    **/
    count<T extends AITagImageCountArgs>(
      args?: Subset<T, AITagImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AITagImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AITagImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AITagImageAggregateArgs>(args: Subset<T, AITagImageAggregateArgs>): Prisma.PrismaPromise<GetAITagImageAggregateType<T>>

    /**
     * Group by AITagImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITagImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AITagImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AITagImageGroupByArgs['orderBy'] }
        : { orderBy?: AITagImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AITagImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAITagImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AITagImage model
   */
  readonly fields: AITagImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AITagImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AITagImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    image<T extends ImageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImageDefaultArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends AITagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AITagDefaultArgs<ExtArgs>>): Prisma__AITagClient<$Result.GetResult<Prisma.$AITagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AITagImage model
   */
  interface AITagImageFieldRefs {
    readonly id: FieldRef<"AITagImage", 'String'>
    readonly confidence: FieldRef<"AITagImage", 'Float'>
    readonly createdAt: FieldRef<"AITagImage", 'DateTime'>
    readonly imageId: FieldRef<"AITagImage", 'String'>
    readonly tagId: FieldRef<"AITagImage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AITagImage findUnique
   */
  export type AITagImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    /**
     * Filter, which AITagImage to fetch.
     */
    where: AITagImageWhereUniqueInput
  }

  /**
   * AITagImage findUniqueOrThrow
   */
  export type AITagImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    /**
     * Filter, which AITagImage to fetch.
     */
    where: AITagImageWhereUniqueInput
  }

  /**
   * AITagImage findFirst
   */
  export type AITagImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    /**
     * Filter, which AITagImage to fetch.
     */
    where?: AITagImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITagImages to fetch.
     */
    orderBy?: AITagImageOrderByWithRelationInput | AITagImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITagImages.
     */
    cursor?: AITagImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITagImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITagImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITagImages.
     */
    distinct?: AITagImageScalarFieldEnum | AITagImageScalarFieldEnum[]
  }

  /**
   * AITagImage findFirstOrThrow
   */
  export type AITagImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    /**
     * Filter, which AITagImage to fetch.
     */
    where?: AITagImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITagImages to fetch.
     */
    orderBy?: AITagImageOrderByWithRelationInput | AITagImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITagImages.
     */
    cursor?: AITagImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITagImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITagImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITagImages.
     */
    distinct?: AITagImageScalarFieldEnum | AITagImageScalarFieldEnum[]
  }

  /**
   * AITagImage findMany
   */
  export type AITagImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    /**
     * Filter, which AITagImages to fetch.
     */
    where?: AITagImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITagImages to fetch.
     */
    orderBy?: AITagImageOrderByWithRelationInput | AITagImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AITagImages.
     */
    cursor?: AITagImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITagImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITagImages.
     */
    skip?: number
    distinct?: AITagImageScalarFieldEnum | AITagImageScalarFieldEnum[]
  }

  /**
   * AITagImage create
   */
  export type AITagImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    /**
     * The data needed to create a AITagImage.
     */
    data: XOR<AITagImageCreateInput, AITagImageUncheckedCreateInput>
  }

  /**
   * AITagImage createMany
   */
  export type AITagImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AITagImages.
     */
    data: AITagImageCreateManyInput | AITagImageCreateManyInput[]
  }

  /**
   * AITagImage createManyAndReturn
   */
  export type AITagImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * The data used to create many AITagImages.
     */
    data: AITagImageCreateManyInput | AITagImageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AITagImage update
   */
  export type AITagImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    /**
     * The data needed to update a AITagImage.
     */
    data: XOR<AITagImageUpdateInput, AITagImageUncheckedUpdateInput>
    /**
     * Choose, which AITagImage to update.
     */
    where: AITagImageWhereUniqueInput
  }

  /**
   * AITagImage updateMany
   */
  export type AITagImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AITagImages.
     */
    data: XOR<AITagImageUpdateManyMutationInput, AITagImageUncheckedUpdateManyInput>
    /**
     * Filter which AITagImages to update
     */
    where?: AITagImageWhereInput
    /**
     * Limit how many AITagImages to update.
     */
    limit?: number
  }

  /**
   * AITagImage updateManyAndReturn
   */
  export type AITagImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * The data used to update AITagImages.
     */
    data: XOR<AITagImageUpdateManyMutationInput, AITagImageUncheckedUpdateManyInput>
    /**
     * Filter which AITagImages to update
     */
    where?: AITagImageWhereInput
    /**
     * Limit how many AITagImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AITagImage upsert
   */
  export type AITagImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    /**
     * The filter to search for the AITagImage to update in case it exists.
     */
    where: AITagImageWhereUniqueInput
    /**
     * In case the AITagImage found by the `where` argument doesn't exist, create a new AITagImage with this data.
     */
    create: XOR<AITagImageCreateInput, AITagImageUncheckedCreateInput>
    /**
     * In case the AITagImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AITagImageUpdateInput, AITagImageUncheckedUpdateInput>
  }

  /**
   * AITagImage delete
   */
  export type AITagImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
    /**
     * Filter which AITagImage to delete.
     */
    where: AITagImageWhereUniqueInput
  }

  /**
   * AITagImage deleteMany
   */
  export type AITagImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITagImages to delete
     */
    where?: AITagImageWhereInput
    /**
     * Limit how many AITagImages to delete.
     */
    limit?: number
  }

  /**
   * AITagImage without action
   */
  export type AITagImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITagImage
     */
    select?: AITagImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITagImage
     */
    omit?: AITagImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITagImageInclude<ExtArgs> | null
  }


  /**
   * Model ImageTag
   */

  export type AggregateImageTag = {
    _count: ImageTagCountAggregateOutputType | null
    _min: ImageTagMinAggregateOutputType | null
    _max: ImageTagMaxAggregateOutputType | null
  }

  export type ImageTagMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    imageId: string | null
  }

  export type ImageTagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    imageId: string | null
  }

  export type ImageTagCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    imageId: number
    _all: number
  }


  export type ImageTagMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    imageId?: true
  }

  export type ImageTagMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    imageId?: true
  }

  export type ImageTagCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    imageId?: true
    _all?: true
  }

  export type ImageTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImageTag to aggregate.
     */
    where?: ImageTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageTags to fetch.
     */
    orderBy?: ImageTagOrderByWithRelationInput | ImageTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImageTags
    **/
    _count?: true | ImageTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageTagMaxAggregateInputType
  }

  export type GetImageTagAggregateType<T extends ImageTagAggregateArgs> = {
        [P in keyof T & keyof AggregateImageTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImageTag[P]>
      : GetScalarType<T[P], AggregateImageTag[P]>
  }




  export type ImageTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageTagWhereInput
    orderBy?: ImageTagOrderByWithAggregationInput | ImageTagOrderByWithAggregationInput[]
    by: ImageTagScalarFieldEnum[] | ImageTagScalarFieldEnum
    having?: ImageTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageTagCountAggregateInputType | true
    _min?: ImageTagMinAggregateInputType
    _max?: ImageTagMaxAggregateInputType
  }

  export type ImageTagGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    imageId: string
    _count: ImageTagCountAggregateOutputType | null
    _min: ImageTagMinAggregateOutputType | null
    _max: ImageTagMaxAggregateOutputType | null
  }

  type GetImageTagGroupByPayload<T extends ImageTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageTagGroupByOutputType[P]>
            : GetScalarType<T[P], ImageTagGroupByOutputType[P]>
        }
      >
    >


  export type ImageTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    imageId?: boolean
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["imageTag"]>

  export type ImageTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    imageId?: boolean
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["imageTag"]>

  export type ImageTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    imageId?: boolean
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["imageTag"]>

  export type ImageTagSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    imageId?: boolean
  }

  export type ImageTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "imageId", ExtArgs["result"]["imageTag"]>
  export type ImageTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }
  export type ImageTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }
  export type ImageTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageDefaultArgs<ExtArgs>
  }

  export type $ImageTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImageTag"
    objects: {
      image: Prisma.$ImagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      imageId: string
    }, ExtArgs["result"]["imageTag"]>
    composites: {}
  }

  type ImageTagGetPayload<S extends boolean | null | undefined | ImageTagDefaultArgs> = $Result.GetResult<Prisma.$ImageTagPayload, S>

  type ImageTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImageTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageTagCountAggregateInputType | true
    }

  export interface ImageTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImageTag'], meta: { name: 'ImageTag' } }
    /**
     * Find zero or one ImageTag that matches the filter.
     * @param {ImageTagFindUniqueArgs} args - Arguments to find a ImageTag
     * @example
     * // Get one ImageTag
     * const imageTag = await prisma.imageTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImageTagFindUniqueArgs>(args: SelectSubset<T, ImageTagFindUniqueArgs<ExtArgs>>): Prisma__ImageTagClient<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImageTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImageTagFindUniqueOrThrowArgs} args - Arguments to find a ImageTag
     * @example
     * // Get one ImageTag
     * const imageTag = await prisma.imageTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImageTagFindUniqueOrThrowArgs>(args: SelectSubset<T, ImageTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImageTagClient<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImageTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageTagFindFirstArgs} args - Arguments to find a ImageTag
     * @example
     * // Get one ImageTag
     * const imageTag = await prisma.imageTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImageTagFindFirstArgs>(args?: SelectSubset<T, ImageTagFindFirstArgs<ExtArgs>>): Prisma__ImageTagClient<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImageTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageTagFindFirstOrThrowArgs} args - Arguments to find a ImageTag
     * @example
     * // Get one ImageTag
     * const imageTag = await prisma.imageTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImageTagFindFirstOrThrowArgs>(args?: SelectSubset<T, ImageTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImageTagClient<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImageTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImageTags
     * const imageTags = await prisma.imageTag.findMany()
     * 
     * // Get first 10 ImageTags
     * const imageTags = await prisma.imageTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageTagWithIdOnly = await prisma.imageTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImageTagFindManyArgs>(args?: SelectSubset<T, ImageTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImageTag.
     * @param {ImageTagCreateArgs} args - Arguments to create a ImageTag.
     * @example
     * // Create one ImageTag
     * const ImageTag = await prisma.imageTag.create({
     *   data: {
     *     // ... data to create a ImageTag
     *   }
     * })
     * 
     */
    create<T extends ImageTagCreateArgs>(args: SelectSubset<T, ImageTagCreateArgs<ExtArgs>>): Prisma__ImageTagClient<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImageTags.
     * @param {ImageTagCreateManyArgs} args - Arguments to create many ImageTags.
     * @example
     * // Create many ImageTags
     * const imageTag = await prisma.imageTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImageTagCreateManyArgs>(args?: SelectSubset<T, ImageTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ImageTags and returns the data saved in the database.
     * @param {ImageTagCreateManyAndReturnArgs} args - Arguments to create many ImageTags.
     * @example
     * // Create many ImageTags
     * const imageTag = await prisma.imageTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ImageTags and only return the `id`
     * const imageTagWithIdOnly = await prisma.imageTag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImageTagCreateManyAndReturnArgs>(args?: SelectSubset<T, ImageTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ImageTag.
     * @param {ImageTagDeleteArgs} args - Arguments to delete one ImageTag.
     * @example
     * // Delete one ImageTag
     * const ImageTag = await prisma.imageTag.delete({
     *   where: {
     *     // ... filter to delete one ImageTag
     *   }
     * })
     * 
     */
    delete<T extends ImageTagDeleteArgs>(args: SelectSubset<T, ImageTagDeleteArgs<ExtArgs>>): Prisma__ImageTagClient<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImageTag.
     * @param {ImageTagUpdateArgs} args - Arguments to update one ImageTag.
     * @example
     * // Update one ImageTag
     * const imageTag = await prisma.imageTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImageTagUpdateArgs>(args: SelectSubset<T, ImageTagUpdateArgs<ExtArgs>>): Prisma__ImageTagClient<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImageTags.
     * @param {ImageTagDeleteManyArgs} args - Arguments to filter ImageTags to delete.
     * @example
     * // Delete a few ImageTags
     * const { count } = await prisma.imageTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImageTagDeleteManyArgs>(args?: SelectSubset<T, ImageTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImageTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImageTags
     * const imageTag = await prisma.imageTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImageTagUpdateManyArgs>(args: SelectSubset<T, ImageTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImageTags and returns the data updated in the database.
     * @param {ImageTagUpdateManyAndReturnArgs} args - Arguments to update many ImageTags.
     * @example
     * // Update many ImageTags
     * const imageTag = await prisma.imageTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ImageTags and only return the `id`
     * const imageTagWithIdOnly = await prisma.imageTag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImageTagUpdateManyAndReturnArgs>(args: SelectSubset<T, ImageTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ImageTag.
     * @param {ImageTagUpsertArgs} args - Arguments to update or create a ImageTag.
     * @example
     * // Update or create a ImageTag
     * const imageTag = await prisma.imageTag.upsert({
     *   create: {
     *     // ... data to create a ImageTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImageTag we want to update
     *   }
     * })
     */
    upsert<T extends ImageTagUpsertArgs>(args: SelectSubset<T, ImageTagUpsertArgs<ExtArgs>>): Prisma__ImageTagClient<$Result.GetResult<Prisma.$ImageTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ImageTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageTagCountArgs} args - Arguments to filter ImageTags to count.
     * @example
     * // Count the number of ImageTags
     * const count = await prisma.imageTag.count({
     *   where: {
     *     // ... the filter for the ImageTags we want to count
     *   }
     * })
    **/
    count<T extends ImageTagCountArgs>(
      args?: Subset<T, ImageTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImageTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageTagAggregateArgs>(args: Subset<T, ImageTagAggregateArgs>): Prisma.PrismaPromise<GetImageTagAggregateType<T>>

    /**
     * Group by ImageTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageTagGroupByArgs['orderBy'] }
        : { orderBy?: ImageTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImageTag model
   */
  readonly fields: ImageTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImageTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    image<T extends ImageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImageDefaultArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ImageTag model
   */
  interface ImageTagFieldRefs {
    readonly id: FieldRef<"ImageTag", 'String'>
    readonly name: FieldRef<"ImageTag", 'String'>
    readonly createdAt: FieldRef<"ImageTag", 'DateTime'>
    readonly imageId: FieldRef<"ImageTag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ImageTag findUnique
   */
  export type ImageTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    /**
     * Filter, which ImageTag to fetch.
     */
    where: ImageTagWhereUniqueInput
  }

  /**
   * ImageTag findUniqueOrThrow
   */
  export type ImageTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    /**
     * Filter, which ImageTag to fetch.
     */
    where: ImageTagWhereUniqueInput
  }

  /**
   * ImageTag findFirst
   */
  export type ImageTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    /**
     * Filter, which ImageTag to fetch.
     */
    where?: ImageTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageTags to fetch.
     */
    orderBy?: ImageTagOrderByWithRelationInput | ImageTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImageTags.
     */
    cursor?: ImageTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImageTags.
     */
    distinct?: ImageTagScalarFieldEnum | ImageTagScalarFieldEnum[]
  }

  /**
   * ImageTag findFirstOrThrow
   */
  export type ImageTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    /**
     * Filter, which ImageTag to fetch.
     */
    where?: ImageTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageTags to fetch.
     */
    orderBy?: ImageTagOrderByWithRelationInput | ImageTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImageTags.
     */
    cursor?: ImageTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImageTags.
     */
    distinct?: ImageTagScalarFieldEnum | ImageTagScalarFieldEnum[]
  }

  /**
   * ImageTag findMany
   */
  export type ImageTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    /**
     * Filter, which ImageTags to fetch.
     */
    where?: ImageTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageTags to fetch.
     */
    orderBy?: ImageTagOrderByWithRelationInput | ImageTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImageTags.
     */
    cursor?: ImageTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageTags.
     */
    skip?: number
    distinct?: ImageTagScalarFieldEnum | ImageTagScalarFieldEnum[]
  }

  /**
   * ImageTag create
   */
  export type ImageTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    /**
     * The data needed to create a ImageTag.
     */
    data: XOR<ImageTagCreateInput, ImageTagUncheckedCreateInput>
  }

  /**
   * ImageTag createMany
   */
  export type ImageTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImageTags.
     */
    data: ImageTagCreateManyInput | ImageTagCreateManyInput[]
  }

  /**
   * ImageTag createManyAndReturn
   */
  export type ImageTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * The data used to create many ImageTags.
     */
    data: ImageTagCreateManyInput | ImageTagCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImageTag update
   */
  export type ImageTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    /**
     * The data needed to update a ImageTag.
     */
    data: XOR<ImageTagUpdateInput, ImageTagUncheckedUpdateInput>
    /**
     * Choose, which ImageTag to update.
     */
    where: ImageTagWhereUniqueInput
  }

  /**
   * ImageTag updateMany
   */
  export type ImageTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImageTags.
     */
    data: XOR<ImageTagUpdateManyMutationInput, ImageTagUncheckedUpdateManyInput>
    /**
     * Filter which ImageTags to update
     */
    where?: ImageTagWhereInput
    /**
     * Limit how many ImageTags to update.
     */
    limit?: number
  }

  /**
   * ImageTag updateManyAndReturn
   */
  export type ImageTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * The data used to update ImageTags.
     */
    data: XOR<ImageTagUpdateManyMutationInput, ImageTagUncheckedUpdateManyInput>
    /**
     * Filter which ImageTags to update
     */
    where?: ImageTagWhereInput
    /**
     * Limit how many ImageTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImageTag upsert
   */
  export type ImageTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    /**
     * The filter to search for the ImageTag to update in case it exists.
     */
    where: ImageTagWhereUniqueInput
    /**
     * In case the ImageTag found by the `where` argument doesn't exist, create a new ImageTag with this data.
     */
    create: XOR<ImageTagCreateInput, ImageTagUncheckedCreateInput>
    /**
     * In case the ImageTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageTagUpdateInput, ImageTagUncheckedUpdateInput>
  }

  /**
   * ImageTag delete
   */
  export type ImageTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
    /**
     * Filter which ImageTag to delete.
     */
    where: ImageTagWhereUniqueInput
  }

  /**
   * ImageTag deleteMany
   */
  export type ImageTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImageTags to delete
     */
    where?: ImageTagWhereInput
    /**
     * Limit how many ImageTags to delete.
     */
    limit?: number
  }

  /**
   * ImageTag without action
   */
  export type ImageTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageTag
     */
    select?: ImageTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageTag
     */
    omit?: ImageTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageTagInclude<ExtArgs> | null
  }


  /**
   * Model Comparison
   */

  export type AggregateComparison = {
    _count: ComparisonCountAggregateOutputType | null
    _avg: ComparisonAvgAggregateOutputType | null
    _sum: ComparisonSumAggregateOutputType | null
    _min: ComparisonMinAggregateOutputType | null
    _max: ComparisonMaxAggregateOutputType | null
  }

  export type ComparisonAvgAggregateOutputType = {
    similarityScore: number | null
  }

  export type ComparisonSumAggregateOutputType = {
    similarityScore: number | null
  }

  export type ComparisonMinAggregateOutputType = {
    id: string | null
    similarityScore: number | null
    createdAt: Date | null
    uploadedImageId: string | null
    matchedModelId: string | null
  }

  export type ComparisonMaxAggregateOutputType = {
    id: string | null
    similarityScore: number | null
    createdAt: Date | null
    uploadedImageId: string | null
    matchedModelId: string | null
  }

  export type ComparisonCountAggregateOutputType = {
    id: number
    similarityScore: number
    createdAt: number
    uploadedImageId: number
    matchedModelId: number
    _all: number
  }


  export type ComparisonAvgAggregateInputType = {
    similarityScore?: true
  }

  export type ComparisonSumAggregateInputType = {
    similarityScore?: true
  }

  export type ComparisonMinAggregateInputType = {
    id?: true
    similarityScore?: true
    createdAt?: true
    uploadedImageId?: true
    matchedModelId?: true
  }

  export type ComparisonMaxAggregateInputType = {
    id?: true
    similarityScore?: true
    createdAt?: true
    uploadedImageId?: true
    matchedModelId?: true
  }

  export type ComparisonCountAggregateInputType = {
    id?: true
    similarityScore?: true
    createdAt?: true
    uploadedImageId?: true
    matchedModelId?: true
    _all?: true
  }

  export type ComparisonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comparison to aggregate.
     */
    where?: ComparisonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comparisons to fetch.
     */
    orderBy?: ComparisonOrderByWithRelationInput | ComparisonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComparisonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comparisons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comparisons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comparisons
    **/
    _count?: true | ComparisonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComparisonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComparisonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComparisonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComparisonMaxAggregateInputType
  }

  export type GetComparisonAggregateType<T extends ComparisonAggregateArgs> = {
        [P in keyof T & keyof AggregateComparison]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComparison[P]>
      : GetScalarType<T[P], AggregateComparison[P]>
  }




  export type ComparisonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComparisonWhereInput
    orderBy?: ComparisonOrderByWithAggregationInput | ComparisonOrderByWithAggregationInput[]
    by: ComparisonScalarFieldEnum[] | ComparisonScalarFieldEnum
    having?: ComparisonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComparisonCountAggregateInputType | true
    _avg?: ComparisonAvgAggregateInputType
    _sum?: ComparisonSumAggregateInputType
    _min?: ComparisonMinAggregateInputType
    _max?: ComparisonMaxAggregateInputType
  }

  export type ComparisonGroupByOutputType = {
    id: string
    similarityScore: number | null
    createdAt: Date
    uploadedImageId: string
    matchedModelId: string
    _count: ComparisonCountAggregateOutputType | null
    _avg: ComparisonAvgAggregateOutputType | null
    _sum: ComparisonSumAggregateOutputType | null
    _min: ComparisonMinAggregateOutputType | null
    _max: ComparisonMaxAggregateOutputType | null
  }

  type GetComparisonGroupByPayload<T extends ComparisonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComparisonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComparisonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComparisonGroupByOutputType[P]>
            : GetScalarType<T[P], ComparisonGroupByOutputType[P]>
        }
      >
    >


  export type ComparisonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    similarityScore?: boolean
    createdAt?: boolean
    uploadedImageId?: boolean
    matchedModelId?: boolean
    uploadedImage?: boolean | ImageDefaultArgs<ExtArgs>
    matchedModel?: boolean | ModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comparison"]>

  export type ComparisonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    similarityScore?: boolean
    createdAt?: boolean
    uploadedImageId?: boolean
    matchedModelId?: boolean
    uploadedImage?: boolean | ImageDefaultArgs<ExtArgs>
    matchedModel?: boolean | ModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comparison"]>

  export type ComparisonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    similarityScore?: boolean
    createdAt?: boolean
    uploadedImageId?: boolean
    matchedModelId?: boolean
    uploadedImage?: boolean | ImageDefaultArgs<ExtArgs>
    matchedModel?: boolean | ModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comparison"]>

  export type ComparisonSelectScalar = {
    id?: boolean
    similarityScore?: boolean
    createdAt?: boolean
    uploadedImageId?: boolean
    matchedModelId?: boolean
  }

  export type ComparisonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "similarityScore" | "createdAt" | "uploadedImageId" | "matchedModelId", ExtArgs["result"]["comparison"]>
  export type ComparisonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedImage?: boolean | ImageDefaultArgs<ExtArgs>
    matchedModel?: boolean | ModelDefaultArgs<ExtArgs>
  }
  export type ComparisonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedImage?: boolean | ImageDefaultArgs<ExtArgs>
    matchedModel?: boolean | ModelDefaultArgs<ExtArgs>
  }
  export type ComparisonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedImage?: boolean | ImageDefaultArgs<ExtArgs>
    matchedModel?: boolean | ModelDefaultArgs<ExtArgs>
  }

  export type $ComparisonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comparison"
    objects: {
      uploadedImage: Prisma.$ImagePayload<ExtArgs>
      matchedModel: Prisma.$ModelPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      similarityScore: number | null
      createdAt: Date
      uploadedImageId: string
      matchedModelId: string
    }, ExtArgs["result"]["comparison"]>
    composites: {}
  }

  type ComparisonGetPayload<S extends boolean | null | undefined | ComparisonDefaultArgs> = $Result.GetResult<Prisma.$ComparisonPayload, S>

  type ComparisonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComparisonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComparisonCountAggregateInputType | true
    }

  export interface ComparisonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comparison'], meta: { name: 'Comparison' } }
    /**
     * Find zero or one Comparison that matches the filter.
     * @param {ComparisonFindUniqueArgs} args - Arguments to find a Comparison
     * @example
     * // Get one Comparison
     * const comparison = await prisma.comparison.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComparisonFindUniqueArgs>(args: SelectSubset<T, ComparisonFindUniqueArgs<ExtArgs>>): Prisma__ComparisonClient<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comparison that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComparisonFindUniqueOrThrowArgs} args - Arguments to find a Comparison
     * @example
     * // Get one Comparison
     * const comparison = await prisma.comparison.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComparisonFindUniqueOrThrowArgs>(args: SelectSubset<T, ComparisonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComparisonClient<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comparison that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComparisonFindFirstArgs} args - Arguments to find a Comparison
     * @example
     * // Get one Comparison
     * const comparison = await prisma.comparison.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComparisonFindFirstArgs>(args?: SelectSubset<T, ComparisonFindFirstArgs<ExtArgs>>): Prisma__ComparisonClient<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comparison that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComparisonFindFirstOrThrowArgs} args - Arguments to find a Comparison
     * @example
     * // Get one Comparison
     * const comparison = await prisma.comparison.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComparisonFindFirstOrThrowArgs>(args?: SelectSubset<T, ComparisonFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComparisonClient<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comparisons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComparisonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comparisons
     * const comparisons = await prisma.comparison.findMany()
     * 
     * // Get first 10 Comparisons
     * const comparisons = await prisma.comparison.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const comparisonWithIdOnly = await prisma.comparison.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComparisonFindManyArgs>(args?: SelectSubset<T, ComparisonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comparison.
     * @param {ComparisonCreateArgs} args - Arguments to create a Comparison.
     * @example
     * // Create one Comparison
     * const Comparison = await prisma.comparison.create({
     *   data: {
     *     // ... data to create a Comparison
     *   }
     * })
     * 
     */
    create<T extends ComparisonCreateArgs>(args: SelectSubset<T, ComparisonCreateArgs<ExtArgs>>): Prisma__ComparisonClient<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comparisons.
     * @param {ComparisonCreateManyArgs} args - Arguments to create many Comparisons.
     * @example
     * // Create many Comparisons
     * const comparison = await prisma.comparison.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComparisonCreateManyArgs>(args?: SelectSubset<T, ComparisonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comparisons and returns the data saved in the database.
     * @param {ComparisonCreateManyAndReturnArgs} args - Arguments to create many Comparisons.
     * @example
     * // Create many Comparisons
     * const comparison = await prisma.comparison.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comparisons and only return the `id`
     * const comparisonWithIdOnly = await prisma.comparison.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComparisonCreateManyAndReturnArgs>(args?: SelectSubset<T, ComparisonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comparison.
     * @param {ComparisonDeleteArgs} args - Arguments to delete one Comparison.
     * @example
     * // Delete one Comparison
     * const Comparison = await prisma.comparison.delete({
     *   where: {
     *     // ... filter to delete one Comparison
     *   }
     * })
     * 
     */
    delete<T extends ComparisonDeleteArgs>(args: SelectSubset<T, ComparisonDeleteArgs<ExtArgs>>): Prisma__ComparisonClient<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comparison.
     * @param {ComparisonUpdateArgs} args - Arguments to update one Comparison.
     * @example
     * // Update one Comparison
     * const comparison = await prisma.comparison.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComparisonUpdateArgs>(args: SelectSubset<T, ComparisonUpdateArgs<ExtArgs>>): Prisma__ComparisonClient<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comparisons.
     * @param {ComparisonDeleteManyArgs} args - Arguments to filter Comparisons to delete.
     * @example
     * // Delete a few Comparisons
     * const { count } = await prisma.comparison.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComparisonDeleteManyArgs>(args?: SelectSubset<T, ComparisonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comparisons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComparisonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comparisons
     * const comparison = await prisma.comparison.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComparisonUpdateManyArgs>(args: SelectSubset<T, ComparisonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comparisons and returns the data updated in the database.
     * @param {ComparisonUpdateManyAndReturnArgs} args - Arguments to update many Comparisons.
     * @example
     * // Update many Comparisons
     * const comparison = await prisma.comparison.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comparisons and only return the `id`
     * const comparisonWithIdOnly = await prisma.comparison.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComparisonUpdateManyAndReturnArgs>(args: SelectSubset<T, ComparisonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comparison.
     * @param {ComparisonUpsertArgs} args - Arguments to update or create a Comparison.
     * @example
     * // Update or create a Comparison
     * const comparison = await prisma.comparison.upsert({
     *   create: {
     *     // ... data to create a Comparison
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comparison we want to update
     *   }
     * })
     */
    upsert<T extends ComparisonUpsertArgs>(args: SelectSubset<T, ComparisonUpsertArgs<ExtArgs>>): Prisma__ComparisonClient<$Result.GetResult<Prisma.$ComparisonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comparisons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComparisonCountArgs} args - Arguments to filter Comparisons to count.
     * @example
     * // Count the number of Comparisons
     * const count = await prisma.comparison.count({
     *   where: {
     *     // ... the filter for the Comparisons we want to count
     *   }
     * })
    **/
    count<T extends ComparisonCountArgs>(
      args?: Subset<T, ComparisonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComparisonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comparison.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComparisonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComparisonAggregateArgs>(args: Subset<T, ComparisonAggregateArgs>): Prisma.PrismaPromise<GetComparisonAggregateType<T>>

    /**
     * Group by Comparison.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComparisonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComparisonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComparisonGroupByArgs['orderBy'] }
        : { orderBy?: ComparisonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComparisonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComparisonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comparison model
   */
  readonly fields: ComparisonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comparison.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComparisonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploadedImage<T extends ImageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImageDefaultArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    matchedModel<T extends ModelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModelDefaultArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comparison model
   */
  interface ComparisonFieldRefs {
    readonly id: FieldRef<"Comparison", 'String'>
    readonly similarityScore: FieldRef<"Comparison", 'Float'>
    readonly createdAt: FieldRef<"Comparison", 'DateTime'>
    readonly uploadedImageId: FieldRef<"Comparison", 'String'>
    readonly matchedModelId: FieldRef<"Comparison", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Comparison findUnique
   */
  export type ComparisonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    /**
     * Filter, which Comparison to fetch.
     */
    where: ComparisonWhereUniqueInput
  }

  /**
   * Comparison findUniqueOrThrow
   */
  export type ComparisonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    /**
     * Filter, which Comparison to fetch.
     */
    where: ComparisonWhereUniqueInput
  }

  /**
   * Comparison findFirst
   */
  export type ComparisonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    /**
     * Filter, which Comparison to fetch.
     */
    where?: ComparisonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comparisons to fetch.
     */
    orderBy?: ComparisonOrderByWithRelationInput | ComparisonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comparisons.
     */
    cursor?: ComparisonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comparisons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comparisons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comparisons.
     */
    distinct?: ComparisonScalarFieldEnum | ComparisonScalarFieldEnum[]
  }

  /**
   * Comparison findFirstOrThrow
   */
  export type ComparisonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    /**
     * Filter, which Comparison to fetch.
     */
    where?: ComparisonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comparisons to fetch.
     */
    orderBy?: ComparisonOrderByWithRelationInput | ComparisonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comparisons.
     */
    cursor?: ComparisonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comparisons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comparisons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comparisons.
     */
    distinct?: ComparisonScalarFieldEnum | ComparisonScalarFieldEnum[]
  }

  /**
   * Comparison findMany
   */
  export type ComparisonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    /**
     * Filter, which Comparisons to fetch.
     */
    where?: ComparisonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comparisons to fetch.
     */
    orderBy?: ComparisonOrderByWithRelationInput | ComparisonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comparisons.
     */
    cursor?: ComparisonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comparisons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comparisons.
     */
    skip?: number
    distinct?: ComparisonScalarFieldEnum | ComparisonScalarFieldEnum[]
  }

  /**
   * Comparison create
   */
  export type ComparisonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    /**
     * The data needed to create a Comparison.
     */
    data: XOR<ComparisonCreateInput, ComparisonUncheckedCreateInput>
  }

  /**
   * Comparison createMany
   */
  export type ComparisonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comparisons.
     */
    data: ComparisonCreateManyInput | ComparisonCreateManyInput[]
  }

  /**
   * Comparison createManyAndReturn
   */
  export type ComparisonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * The data used to create many Comparisons.
     */
    data: ComparisonCreateManyInput | ComparisonCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comparison update
   */
  export type ComparisonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    /**
     * The data needed to update a Comparison.
     */
    data: XOR<ComparisonUpdateInput, ComparisonUncheckedUpdateInput>
    /**
     * Choose, which Comparison to update.
     */
    where: ComparisonWhereUniqueInput
  }

  /**
   * Comparison updateMany
   */
  export type ComparisonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comparisons.
     */
    data: XOR<ComparisonUpdateManyMutationInput, ComparisonUncheckedUpdateManyInput>
    /**
     * Filter which Comparisons to update
     */
    where?: ComparisonWhereInput
    /**
     * Limit how many Comparisons to update.
     */
    limit?: number
  }

  /**
   * Comparison updateManyAndReturn
   */
  export type ComparisonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * The data used to update Comparisons.
     */
    data: XOR<ComparisonUpdateManyMutationInput, ComparisonUncheckedUpdateManyInput>
    /**
     * Filter which Comparisons to update
     */
    where?: ComparisonWhereInput
    /**
     * Limit how many Comparisons to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comparison upsert
   */
  export type ComparisonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    /**
     * The filter to search for the Comparison to update in case it exists.
     */
    where: ComparisonWhereUniqueInput
    /**
     * In case the Comparison found by the `where` argument doesn't exist, create a new Comparison with this data.
     */
    create: XOR<ComparisonCreateInput, ComparisonUncheckedCreateInput>
    /**
     * In case the Comparison was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComparisonUpdateInput, ComparisonUncheckedUpdateInput>
  }

  /**
   * Comparison delete
   */
  export type ComparisonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
    /**
     * Filter which Comparison to delete.
     */
    where: ComparisonWhereUniqueInput
  }

  /**
   * Comparison deleteMany
   */
  export type ComparisonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comparisons to delete
     */
    where?: ComparisonWhereInput
    /**
     * Limit how many Comparisons to delete.
     */
    limit?: number
  }

  /**
   * Comparison without action
   */
  export type ComparisonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comparison
     */
    select?: ComparisonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comparison
     */
    omit?: ComparisonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComparisonInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ImageScalarFieldEnum: {
    id: 'id',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    mimeType: 'mimeType',
    size: 'size',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const ModelScalarFieldEnum: {
    id: 'id',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    format: 'format',
    size: 'size',
    parameters: 'parameters',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    imageId: 'imageId'
  };

  export type ModelScalarFieldEnum = (typeof ModelScalarFieldEnum)[keyof typeof ModelScalarFieldEnum]


  export const AITagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AITagScalarFieldEnum = (typeof AITagScalarFieldEnum)[keyof typeof AITagScalarFieldEnum]


  export const AITagImageScalarFieldEnum: {
    id: 'id',
    confidence: 'confidence',
    createdAt: 'createdAt',
    imageId: 'imageId',
    tagId: 'tagId'
  };

  export type AITagImageScalarFieldEnum = (typeof AITagImageScalarFieldEnum)[keyof typeof AITagImageScalarFieldEnum]


  export const ImageTagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    imageId: 'imageId'
  };

  export type ImageTagScalarFieldEnum = (typeof ImageTagScalarFieldEnum)[keyof typeof ImageTagScalarFieldEnum]


  export const ComparisonScalarFieldEnum: {
    id: 'id',
    similarityScore: 'similarityScore',
    createdAt: 'createdAt',
    uploadedImageId: 'uploadedImageId',
    matchedModelId: 'matchedModelId'
  };

  export type ComparisonScalarFieldEnum = (typeof ComparisonScalarFieldEnum)[keyof typeof ComparisonScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ImageWhereInput = {
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    id?: StringFilter<"Image"> | string
    fileName?: StringFilter<"Image"> | string
    fileUrl?: StringFilter<"Image"> | string
    mimeType?: StringNullableFilter<"Image"> | string | null
    size?: IntNullableFilter<"Image"> | number | null
    createdAt?: DateTimeFilter<"Image"> | Date | string
    updatedAt?: DateTimeFilter<"Image"> | Date | string
    model?: XOR<ModelNullableScalarRelationFilter, ModelWhereInput> | null
    tags?: ImageTagListRelationFilter
    aiTags?: AITagImageListRelationFilter
    comparisons?: ComparisonListRelationFilter
  }

  export type ImageOrderByWithRelationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    mimeType?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: ModelOrderByWithRelationInput
    tags?: ImageTagOrderByRelationAggregateInput
    aiTags?: AITagImageOrderByRelationAggregateInput
    comparisons?: ComparisonOrderByRelationAggregateInput
  }

  export type ImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    fileName?: StringFilter<"Image"> | string
    fileUrl?: StringFilter<"Image"> | string
    mimeType?: StringNullableFilter<"Image"> | string | null
    size?: IntNullableFilter<"Image"> | number | null
    createdAt?: DateTimeFilter<"Image"> | Date | string
    updatedAt?: DateTimeFilter<"Image"> | Date | string
    model?: XOR<ModelNullableScalarRelationFilter, ModelWhereInput> | null
    tags?: ImageTagListRelationFilter
    aiTags?: AITagImageListRelationFilter
    comparisons?: ComparisonListRelationFilter
  }, "id">

  export type ImageOrderByWithAggregationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    mimeType?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ImageCountOrderByAggregateInput
    _avg?: ImageAvgOrderByAggregateInput
    _max?: ImageMaxOrderByAggregateInput
    _min?: ImageMinOrderByAggregateInput
    _sum?: ImageSumOrderByAggregateInput
  }

  export type ImageScalarWhereWithAggregatesInput = {
    AND?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    OR?: ImageScalarWhereWithAggregatesInput[]
    NOT?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Image"> | string
    fileName?: StringWithAggregatesFilter<"Image"> | string
    fileUrl?: StringWithAggregatesFilter<"Image"> | string
    mimeType?: StringNullableWithAggregatesFilter<"Image"> | string | null
    size?: IntNullableWithAggregatesFilter<"Image"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Image"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Image"> | Date | string
  }

  export type ModelWhereInput = {
    AND?: ModelWhereInput | ModelWhereInput[]
    OR?: ModelWhereInput[]
    NOT?: ModelWhereInput | ModelWhereInput[]
    id?: StringFilter<"Model"> | string
    fileName?: StringFilter<"Model"> | string
    fileUrl?: StringFilter<"Model"> | string
    format?: StringNullableFilter<"Model"> | string | null
    size?: IntNullableFilter<"Model"> | number | null
    parameters?: StringNullableFilter<"Model"> | string | null
    createdAt?: DateTimeFilter<"Model"> | Date | string
    updatedAt?: DateTimeFilter<"Model"> | Date | string
    imageId?: StringFilter<"Model"> | string
    image?: XOR<ImageScalarRelationFilter, ImageWhereInput>
    comparisons?: ComparisonListRelationFilter
  }

  export type ModelOrderByWithRelationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    format?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    parameters?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageId?: SortOrder
    image?: ImageOrderByWithRelationInput
    comparisons?: ComparisonOrderByRelationAggregateInput
  }

  export type ModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    imageId?: string
    AND?: ModelWhereInput | ModelWhereInput[]
    OR?: ModelWhereInput[]
    NOT?: ModelWhereInput | ModelWhereInput[]
    fileName?: StringFilter<"Model"> | string
    fileUrl?: StringFilter<"Model"> | string
    format?: StringNullableFilter<"Model"> | string | null
    size?: IntNullableFilter<"Model"> | number | null
    parameters?: StringNullableFilter<"Model"> | string | null
    createdAt?: DateTimeFilter<"Model"> | Date | string
    updatedAt?: DateTimeFilter<"Model"> | Date | string
    image?: XOR<ImageScalarRelationFilter, ImageWhereInput>
    comparisons?: ComparisonListRelationFilter
  }, "id" | "imageId">

  export type ModelOrderByWithAggregationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    format?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    parameters?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageId?: SortOrder
    _count?: ModelCountOrderByAggregateInput
    _avg?: ModelAvgOrderByAggregateInput
    _max?: ModelMaxOrderByAggregateInput
    _min?: ModelMinOrderByAggregateInput
    _sum?: ModelSumOrderByAggregateInput
  }

  export type ModelScalarWhereWithAggregatesInput = {
    AND?: ModelScalarWhereWithAggregatesInput | ModelScalarWhereWithAggregatesInput[]
    OR?: ModelScalarWhereWithAggregatesInput[]
    NOT?: ModelScalarWhereWithAggregatesInput | ModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Model"> | string
    fileName?: StringWithAggregatesFilter<"Model"> | string
    fileUrl?: StringWithAggregatesFilter<"Model"> | string
    format?: StringNullableWithAggregatesFilter<"Model"> | string | null
    size?: IntNullableWithAggregatesFilter<"Model"> | number | null
    parameters?: StringNullableWithAggregatesFilter<"Model"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Model"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Model"> | Date | string
    imageId?: StringWithAggregatesFilter<"Model"> | string
  }

  export type AITagWhereInput = {
    AND?: AITagWhereInput | AITagWhereInput[]
    OR?: AITagWhereInput[]
    NOT?: AITagWhereInput | AITagWhereInput[]
    id?: StringFilter<"AITag"> | string
    name?: StringFilter<"AITag"> | string
    description?: StringNullableFilter<"AITag"> | string | null
    category?: StringNullableFilter<"AITag"> | string | null
    createdAt?: DateTimeFilter<"AITag"> | Date | string
    updatedAt?: DateTimeFilter<"AITag"> | Date | string
    images?: AITagImageListRelationFilter
  }

  export type AITagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    images?: AITagImageOrderByRelationAggregateInput
  }

  export type AITagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: AITagWhereInput | AITagWhereInput[]
    OR?: AITagWhereInput[]
    NOT?: AITagWhereInput | AITagWhereInput[]
    description?: StringNullableFilter<"AITag"> | string | null
    category?: StringNullableFilter<"AITag"> | string | null
    createdAt?: DateTimeFilter<"AITag"> | Date | string
    updatedAt?: DateTimeFilter<"AITag"> | Date | string
    images?: AITagImageListRelationFilter
  }, "id" | "name">

  export type AITagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AITagCountOrderByAggregateInput
    _max?: AITagMaxOrderByAggregateInput
    _min?: AITagMinOrderByAggregateInput
  }

  export type AITagScalarWhereWithAggregatesInput = {
    AND?: AITagScalarWhereWithAggregatesInput | AITagScalarWhereWithAggregatesInput[]
    OR?: AITagScalarWhereWithAggregatesInput[]
    NOT?: AITagScalarWhereWithAggregatesInput | AITagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AITag"> | string
    name?: StringWithAggregatesFilter<"AITag"> | string
    description?: StringNullableWithAggregatesFilter<"AITag"> | string | null
    category?: StringNullableWithAggregatesFilter<"AITag"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AITag"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AITag"> | Date | string
  }

  export type AITagImageWhereInput = {
    AND?: AITagImageWhereInput | AITagImageWhereInput[]
    OR?: AITagImageWhereInput[]
    NOT?: AITagImageWhereInput | AITagImageWhereInput[]
    id?: StringFilter<"AITagImage"> | string
    confidence?: FloatFilter<"AITagImage"> | number
    createdAt?: DateTimeFilter<"AITagImage"> | Date | string
    imageId?: StringFilter<"AITagImage"> | string
    tagId?: StringFilter<"AITagImage"> | string
    image?: XOR<ImageScalarRelationFilter, ImageWhereInput>
    tag?: XOR<AITagScalarRelationFilter, AITagWhereInput>
  }

  export type AITagImageOrderByWithRelationInput = {
    id?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
    tagId?: SortOrder
    image?: ImageOrderByWithRelationInput
    tag?: AITagOrderByWithRelationInput
  }

  export type AITagImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    imageId_tagId?: AITagImageImageIdTagIdCompoundUniqueInput
    AND?: AITagImageWhereInput | AITagImageWhereInput[]
    OR?: AITagImageWhereInput[]
    NOT?: AITagImageWhereInput | AITagImageWhereInput[]
    confidence?: FloatFilter<"AITagImage"> | number
    createdAt?: DateTimeFilter<"AITagImage"> | Date | string
    imageId?: StringFilter<"AITagImage"> | string
    tagId?: StringFilter<"AITagImage"> | string
    image?: XOR<ImageScalarRelationFilter, ImageWhereInput>
    tag?: XOR<AITagScalarRelationFilter, AITagWhereInput>
  }, "id" | "imageId_tagId">

  export type AITagImageOrderByWithAggregationInput = {
    id?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
    tagId?: SortOrder
    _count?: AITagImageCountOrderByAggregateInput
    _avg?: AITagImageAvgOrderByAggregateInput
    _max?: AITagImageMaxOrderByAggregateInput
    _min?: AITagImageMinOrderByAggregateInput
    _sum?: AITagImageSumOrderByAggregateInput
  }

  export type AITagImageScalarWhereWithAggregatesInput = {
    AND?: AITagImageScalarWhereWithAggregatesInput | AITagImageScalarWhereWithAggregatesInput[]
    OR?: AITagImageScalarWhereWithAggregatesInput[]
    NOT?: AITagImageScalarWhereWithAggregatesInput | AITagImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AITagImage"> | string
    confidence?: FloatWithAggregatesFilter<"AITagImage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AITagImage"> | Date | string
    imageId?: StringWithAggregatesFilter<"AITagImage"> | string
    tagId?: StringWithAggregatesFilter<"AITagImage"> | string
  }

  export type ImageTagWhereInput = {
    AND?: ImageTagWhereInput | ImageTagWhereInput[]
    OR?: ImageTagWhereInput[]
    NOT?: ImageTagWhereInput | ImageTagWhereInput[]
    id?: StringFilter<"ImageTag"> | string
    name?: StringFilter<"ImageTag"> | string
    createdAt?: DateTimeFilter<"ImageTag"> | Date | string
    imageId?: StringFilter<"ImageTag"> | string
    image?: XOR<ImageScalarRelationFilter, ImageWhereInput>
  }

  export type ImageTagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
    image?: ImageOrderByWithRelationInput
  }

  export type ImageTagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImageTagWhereInput | ImageTagWhereInput[]
    OR?: ImageTagWhereInput[]
    NOT?: ImageTagWhereInput | ImageTagWhereInput[]
    name?: StringFilter<"ImageTag"> | string
    createdAt?: DateTimeFilter<"ImageTag"> | Date | string
    imageId?: StringFilter<"ImageTag"> | string
    image?: XOR<ImageScalarRelationFilter, ImageWhereInput>
  }, "id">

  export type ImageTagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
    _count?: ImageTagCountOrderByAggregateInput
    _max?: ImageTagMaxOrderByAggregateInput
    _min?: ImageTagMinOrderByAggregateInput
  }

  export type ImageTagScalarWhereWithAggregatesInput = {
    AND?: ImageTagScalarWhereWithAggregatesInput | ImageTagScalarWhereWithAggregatesInput[]
    OR?: ImageTagScalarWhereWithAggregatesInput[]
    NOT?: ImageTagScalarWhereWithAggregatesInput | ImageTagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ImageTag"> | string
    name?: StringWithAggregatesFilter<"ImageTag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ImageTag"> | Date | string
    imageId?: StringWithAggregatesFilter<"ImageTag"> | string
  }

  export type ComparisonWhereInput = {
    AND?: ComparisonWhereInput | ComparisonWhereInput[]
    OR?: ComparisonWhereInput[]
    NOT?: ComparisonWhereInput | ComparisonWhereInput[]
    id?: StringFilter<"Comparison"> | string
    similarityScore?: FloatNullableFilter<"Comparison"> | number | null
    createdAt?: DateTimeFilter<"Comparison"> | Date | string
    uploadedImageId?: StringFilter<"Comparison"> | string
    matchedModelId?: StringFilter<"Comparison"> | string
    uploadedImage?: XOR<ImageScalarRelationFilter, ImageWhereInput>
    matchedModel?: XOR<ModelScalarRelationFilter, ModelWhereInput>
  }

  export type ComparisonOrderByWithRelationInput = {
    id?: SortOrder
    similarityScore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    uploadedImageId?: SortOrder
    matchedModelId?: SortOrder
    uploadedImage?: ImageOrderByWithRelationInput
    matchedModel?: ModelOrderByWithRelationInput
  }

  export type ComparisonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComparisonWhereInput | ComparisonWhereInput[]
    OR?: ComparisonWhereInput[]
    NOT?: ComparisonWhereInput | ComparisonWhereInput[]
    similarityScore?: FloatNullableFilter<"Comparison"> | number | null
    createdAt?: DateTimeFilter<"Comparison"> | Date | string
    uploadedImageId?: StringFilter<"Comparison"> | string
    matchedModelId?: StringFilter<"Comparison"> | string
    uploadedImage?: XOR<ImageScalarRelationFilter, ImageWhereInput>
    matchedModel?: XOR<ModelScalarRelationFilter, ModelWhereInput>
  }, "id">

  export type ComparisonOrderByWithAggregationInput = {
    id?: SortOrder
    similarityScore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    uploadedImageId?: SortOrder
    matchedModelId?: SortOrder
    _count?: ComparisonCountOrderByAggregateInput
    _avg?: ComparisonAvgOrderByAggregateInput
    _max?: ComparisonMaxOrderByAggregateInput
    _min?: ComparisonMinOrderByAggregateInput
    _sum?: ComparisonSumOrderByAggregateInput
  }

  export type ComparisonScalarWhereWithAggregatesInput = {
    AND?: ComparisonScalarWhereWithAggregatesInput | ComparisonScalarWhereWithAggregatesInput[]
    OR?: ComparisonScalarWhereWithAggregatesInput[]
    NOT?: ComparisonScalarWhereWithAggregatesInput | ComparisonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comparison"> | string
    similarityScore?: FloatNullableWithAggregatesFilter<"Comparison"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Comparison"> | Date | string
    uploadedImageId?: StringWithAggregatesFilter<"Comparison"> | string
    matchedModelId?: StringWithAggregatesFilter<"Comparison"> | string
  }

  export type ImageCreateInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    model?: ModelCreateNestedOneWithoutImageInput
    tags?: ImageTagCreateNestedManyWithoutImageInput
    aiTags?: AITagImageCreateNestedManyWithoutImageInput
    comparisons?: ComparisonCreateNestedManyWithoutUploadedImageInput
  }

  export type ImageUncheckedCreateInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    model?: ModelUncheckedCreateNestedOneWithoutImageInput
    tags?: ImageTagUncheckedCreateNestedManyWithoutImageInput
    aiTags?: AITagImageUncheckedCreateNestedManyWithoutImageInput
    comparisons?: ComparisonUncheckedCreateNestedManyWithoutUploadedImageInput
  }

  export type ImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUpdateOneWithoutImageNestedInput
    tags?: ImageTagUpdateManyWithoutImageNestedInput
    aiTags?: AITagImageUpdateManyWithoutImageNestedInput
    comparisons?: ComparisonUpdateManyWithoutUploadedImageNestedInput
  }

  export type ImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUncheckedUpdateOneWithoutImageNestedInput
    tags?: ImageTagUncheckedUpdateManyWithoutImageNestedInput
    aiTags?: AITagImageUncheckedUpdateManyWithoutImageNestedInput
    comparisons?: ComparisonUncheckedUpdateManyWithoutUploadedImageNestedInput
  }

  export type ImageCreateManyInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelCreateInput = {
    id?: string
    fileName: string
    fileUrl: string
    format?: string | null
    size?: number | null
    parameters?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    image: ImageCreateNestedOneWithoutModelInput
    comparisons?: ComparisonCreateNestedManyWithoutMatchedModelInput
  }

  export type ModelUncheckedCreateInput = {
    id?: string
    fileName: string
    fileUrl: string
    format?: string | null
    size?: number | null
    parameters?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    imageId: string
    comparisons?: ComparisonUncheckedCreateNestedManyWithoutMatchedModelInput
  }

  export type ModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ImageUpdateOneRequiredWithoutModelNestedInput
    comparisons?: ComparisonUpdateManyWithoutMatchedModelNestedInput
  }

  export type ModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageId?: StringFieldUpdateOperationsInput | string
    comparisons?: ComparisonUncheckedUpdateManyWithoutMatchedModelNestedInput
  }

  export type ModelCreateManyInput = {
    id?: string
    fileName: string
    fileUrl: string
    format?: string | null
    size?: number | null
    parameters?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    imageId: string
  }

  export type ModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageId?: StringFieldUpdateOperationsInput | string
  }

  export type AITagCreateInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: AITagImageCreateNestedManyWithoutTagInput
  }

  export type AITagUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: AITagImageUncheckedCreateNestedManyWithoutTagInput
  }

  export type AITagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: AITagImageUpdateManyWithoutTagNestedInput
  }

  export type AITagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: AITagImageUncheckedUpdateManyWithoutTagNestedInput
  }

  export type AITagCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AITagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITagImageCreateInput = {
    id?: string
    confidence: number
    createdAt?: Date | string
    image: ImageCreateNestedOneWithoutAiTagsInput
    tag: AITagCreateNestedOneWithoutImagesInput
  }

  export type AITagImageUncheckedCreateInput = {
    id?: string
    confidence: number
    createdAt?: Date | string
    imageId: string
    tagId: string
  }

  export type AITagImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ImageUpdateOneRequiredWithoutAiTagsNestedInput
    tag?: AITagUpdateOneRequiredWithoutImagesNestedInput
  }

  export type AITagImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type AITagImageCreateManyInput = {
    id?: string
    confidence: number
    createdAt?: Date | string
    imageId: string
    tagId: string
  }

  export type AITagImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITagImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ImageTagCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    image: ImageCreateNestedOneWithoutTagsInput
  }

  export type ImageTagUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    imageId: string
  }

  export type ImageTagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ImageUpdateOneRequiredWithoutTagsNestedInput
  }

  export type ImageTagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageId?: StringFieldUpdateOperationsInput | string
  }

  export type ImageTagCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    imageId: string
  }

  export type ImageTagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageTagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageId?: StringFieldUpdateOperationsInput | string
  }

  export type ComparisonCreateInput = {
    id?: string
    similarityScore?: number | null
    createdAt?: Date | string
    uploadedImage: ImageCreateNestedOneWithoutComparisonsInput
    matchedModel: ModelCreateNestedOneWithoutComparisonsInput
  }

  export type ComparisonUncheckedCreateInput = {
    id?: string
    similarityScore?: number | null
    createdAt?: Date | string
    uploadedImageId: string
    matchedModelId: string
  }

  export type ComparisonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedImage?: ImageUpdateOneRequiredWithoutComparisonsNestedInput
    matchedModel?: ModelUpdateOneRequiredWithoutComparisonsNestedInput
  }

  export type ComparisonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedImageId?: StringFieldUpdateOperationsInput | string
    matchedModelId?: StringFieldUpdateOperationsInput | string
  }

  export type ComparisonCreateManyInput = {
    id?: string
    similarityScore?: number | null
    createdAt?: Date | string
    uploadedImageId: string
    matchedModelId: string
  }

  export type ComparisonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComparisonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedImageId?: StringFieldUpdateOperationsInput | string
    matchedModelId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ModelNullableScalarRelationFilter = {
    is?: ModelWhereInput | null
    isNot?: ModelWhereInput | null
  }

  export type ImageTagListRelationFilter = {
    every?: ImageTagWhereInput
    some?: ImageTagWhereInput
    none?: ImageTagWhereInput
  }

  export type AITagImageListRelationFilter = {
    every?: AITagImageWhereInput
    some?: AITagImageWhereInput
    none?: AITagImageWhereInput
  }

  export type ComparisonListRelationFilter = {
    every?: ComparisonWhereInput
    some?: ComparisonWhereInput
    none?: ComparisonWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ImageTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AITagImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComparisonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImageCountOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImageAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type ImageMaxOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImageMinOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImageSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ImageScalarRelationFilter = {
    is?: ImageWhereInput
    isNot?: ImageWhereInput
  }

  export type ModelCountOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    format?: SortOrder
    size?: SortOrder
    parameters?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageId?: SortOrder
  }

  export type ModelAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type ModelMaxOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    format?: SortOrder
    size?: SortOrder
    parameters?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageId?: SortOrder
  }

  export type ModelMinOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    format?: SortOrder
    size?: SortOrder
    parameters?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageId?: SortOrder
  }

  export type ModelSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type AITagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AITagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AITagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AITagScalarRelationFilter = {
    is?: AITagWhereInput
    isNot?: AITagWhereInput
  }

  export type AITagImageImageIdTagIdCompoundUniqueInput = {
    imageId: string
    tagId: string
  }

  export type AITagImageCountOrderByAggregateInput = {
    id?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
    tagId?: SortOrder
  }

  export type AITagImageAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type AITagImageMaxOrderByAggregateInput = {
    id?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
    tagId?: SortOrder
  }

  export type AITagImageMinOrderByAggregateInput = {
    id?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
    tagId?: SortOrder
  }

  export type AITagImageSumOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ImageTagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
  }

  export type ImageTagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
  }

  export type ImageTagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    imageId?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ModelScalarRelationFilter = {
    is?: ModelWhereInput
    isNot?: ModelWhereInput
  }

  export type ComparisonCountOrderByAggregateInput = {
    id?: SortOrder
    similarityScore?: SortOrder
    createdAt?: SortOrder
    uploadedImageId?: SortOrder
    matchedModelId?: SortOrder
  }

  export type ComparisonAvgOrderByAggregateInput = {
    similarityScore?: SortOrder
  }

  export type ComparisonMaxOrderByAggregateInput = {
    id?: SortOrder
    similarityScore?: SortOrder
    createdAt?: SortOrder
    uploadedImageId?: SortOrder
    matchedModelId?: SortOrder
  }

  export type ComparisonMinOrderByAggregateInput = {
    id?: SortOrder
    similarityScore?: SortOrder
    createdAt?: SortOrder
    uploadedImageId?: SortOrder
    matchedModelId?: SortOrder
  }

  export type ComparisonSumOrderByAggregateInput = {
    similarityScore?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ModelCreateNestedOneWithoutImageInput = {
    create?: XOR<ModelCreateWithoutImageInput, ModelUncheckedCreateWithoutImageInput>
    connectOrCreate?: ModelCreateOrConnectWithoutImageInput
    connect?: ModelWhereUniqueInput
  }

  export type ImageTagCreateNestedManyWithoutImageInput = {
    create?: XOR<ImageTagCreateWithoutImageInput, ImageTagUncheckedCreateWithoutImageInput> | ImageTagCreateWithoutImageInput[] | ImageTagUncheckedCreateWithoutImageInput[]
    connectOrCreate?: ImageTagCreateOrConnectWithoutImageInput | ImageTagCreateOrConnectWithoutImageInput[]
    createMany?: ImageTagCreateManyImageInputEnvelope
    connect?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
  }

  export type AITagImageCreateNestedManyWithoutImageInput = {
    create?: XOR<AITagImageCreateWithoutImageInput, AITagImageUncheckedCreateWithoutImageInput> | AITagImageCreateWithoutImageInput[] | AITagImageUncheckedCreateWithoutImageInput[]
    connectOrCreate?: AITagImageCreateOrConnectWithoutImageInput | AITagImageCreateOrConnectWithoutImageInput[]
    createMany?: AITagImageCreateManyImageInputEnvelope
    connect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
  }

  export type ComparisonCreateNestedManyWithoutUploadedImageInput = {
    create?: XOR<ComparisonCreateWithoutUploadedImageInput, ComparisonUncheckedCreateWithoutUploadedImageInput> | ComparisonCreateWithoutUploadedImageInput[] | ComparisonUncheckedCreateWithoutUploadedImageInput[]
    connectOrCreate?: ComparisonCreateOrConnectWithoutUploadedImageInput | ComparisonCreateOrConnectWithoutUploadedImageInput[]
    createMany?: ComparisonCreateManyUploadedImageInputEnvelope
    connect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
  }

  export type ModelUncheckedCreateNestedOneWithoutImageInput = {
    create?: XOR<ModelCreateWithoutImageInput, ModelUncheckedCreateWithoutImageInput>
    connectOrCreate?: ModelCreateOrConnectWithoutImageInput
    connect?: ModelWhereUniqueInput
  }

  export type ImageTagUncheckedCreateNestedManyWithoutImageInput = {
    create?: XOR<ImageTagCreateWithoutImageInput, ImageTagUncheckedCreateWithoutImageInput> | ImageTagCreateWithoutImageInput[] | ImageTagUncheckedCreateWithoutImageInput[]
    connectOrCreate?: ImageTagCreateOrConnectWithoutImageInput | ImageTagCreateOrConnectWithoutImageInput[]
    createMany?: ImageTagCreateManyImageInputEnvelope
    connect?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
  }

  export type AITagImageUncheckedCreateNestedManyWithoutImageInput = {
    create?: XOR<AITagImageCreateWithoutImageInput, AITagImageUncheckedCreateWithoutImageInput> | AITagImageCreateWithoutImageInput[] | AITagImageUncheckedCreateWithoutImageInput[]
    connectOrCreate?: AITagImageCreateOrConnectWithoutImageInput | AITagImageCreateOrConnectWithoutImageInput[]
    createMany?: AITagImageCreateManyImageInputEnvelope
    connect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
  }

  export type ComparisonUncheckedCreateNestedManyWithoutUploadedImageInput = {
    create?: XOR<ComparisonCreateWithoutUploadedImageInput, ComparisonUncheckedCreateWithoutUploadedImageInput> | ComparisonCreateWithoutUploadedImageInput[] | ComparisonUncheckedCreateWithoutUploadedImageInput[]
    connectOrCreate?: ComparisonCreateOrConnectWithoutUploadedImageInput | ComparisonCreateOrConnectWithoutUploadedImageInput[]
    createMany?: ComparisonCreateManyUploadedImageInputEnvelope
    connect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ModelUpdateOneWithoutImageNestedInput = {
    create?: XOR<ModelCreateWithoutImageInput, ModelUncheckedCreateWithoutImageInput>
    connectOrCreate?: ModelCreateOrConnectWithoutImageInput
    upsert?: ModelUpsertWithoutImageInput
    disconnect?: ModelWhereInput | boolean
    delete?: ModelWhereInput | boolean
    connect?: ModelWhereUniqueInput
    update?: XOR<XOR<ModelUpdateToOneWithWhereWithoutImageInput, ModelUpdateWithoutImageInput>, ModelUncheckedUpdateWithoutImageInput>
  }

  export type ImageTagUpdateManyWithoutImageNestedInput = {
    create?: XOR<ImageTagCreateWithoutImageInput, ImageTagUncheckedCreateWithoutImageInput> | ImageTagCreateWithoutImageInput[] | ImageTagUncheckedCreateWithoutImageInput[]
    connectOrCreate?: ImageTagCreateOrConnectWithoutImageInput | ImageTagCreateOrConnectWithoutImageInput[]
    upsert?: ImageTagUpsertWithWhereUniqueWithoutImageInput | ImageTagUpsertWithWhereUniqueWithoutImageInput[]
    createMany?: ImageTagCreateManyImageInputEnvelope
    set?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
    disconnect?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
    delete?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
    connect?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
    update?: ImageTagUpdateWithWhereUniqueWithoutImageInput | ImageTagUpdateWithWhereUniqueWithoutImageInput[]
    updateMany?: ImageTagUpdateManyWithWhereWithoutImageInput | ImageTagUpdateManyWithWhereWithoutImageInput[]
    deleteMany?: ImageTagScalarWhereInput | ImageTagScalarWhereInput[]
  }

  export type AITagImageUpdateManyWithoutImageNestedInput = {
    create?: XOR<AITagImageCreateWithoutImageInput, AITagImageUncheckedCreateWithoutImageInput> | AITagImageCreateWithoutImageInput[] | AITagImageUncheckedCreateWithoutImageInput[]
    connectOrCreate?: AITagImageCreateOrConnectWithoutImageInput | AITagImageCreateOrConnectWithoutImageInput[]
    upsert?: AITagImageUpsertWithWhereUniqueWithoutImageInput | AITagImageUpsertWithWhereUniqueWithoutImageInput[]
    createMany?: AITagImageCreateManyImageInputEnvelope
    set?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    disconnect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    delete?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    connect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    update?: AITagImageUpdateWithWhereUniqueWithoutImageInput | AITagImageUpdateWithWhereUniqueWithoutImageInput[]
    updateMany?: AITagImageUpdateManyWithWhereWithoutImageInput | AITagImageUpdateManyWithWhereWithoutImageInput[]
    deleteMany?: AITagImageScalarWhereInput | AITagImageScalarWhereInput[]
  }

  export type ComparisonUpdateManyWithoutUploadedImageNestedInput = {
    create?: XOR<ComparisonCreateWithoutUploadedImageInput, ComparisonUncheckedCreateWithoutUploadedImageInput> | ComparisonCreateWithoutUploadedImageInput[] | ComparisonUncheckedCreateWithoutUploadedImageInput[]
    connectOrCreate?: ComparisonCreateOrConnectWithoutUploadedImageInput | ComparisonCreateOrConnectWithoutUploadedImageInput[]
    upsert?: ComparisonUpsertWithWhereUniqueWithoutUploadedImageInput | ComparisonUpsertWithWhereUniqueWithoutUploadedImageInput[]
    createMany?: ComparisonCreateManyUploadedImageInputEnvelope
    set?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    disconnect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    delete?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    connect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    update?: ComparisonUpdateWithWhereUniqueWithoutUploadedImageInput | ComparisonUpdateWithWhereUniqueWithoutUploadedImageInput[]
    updateMany?: ComparisonUpdateManyWithWhereWithoutUploadedImageInput | ComparisonUpdateManyWithWhereWithoutUploadedImageInput[]
    deleteMany?: ComparisonScalarWhereInput | ComparisonScalarWhereInput[]
  }

  export type ModelUncheckedUpdateOneWithoutImageNestedInput = {
    create?: XOR<ModelCreateWithoutImageInput, ModelUncheckedCreateWithoutImageInput>
    connectOrCreate?: ModelCreateOrConnectWithoutImageInput
    upsert?: ModelUpsertWithoutImageInput
    disconnect?: ModelWhereInput | boolean
    delete?: ModelWhereInput | boolean
    connect?: ModelWhereUniqueInput
    update?: XOR<XOR<ModelUpdateToOneWithWhereWithoutImageInput, ModelUpdateWithoutImageInput>, ModelUncheckedUpdateWithoutImageInput>
  }

  export type ImageTagUncheckedUpdateManyWithoutImageNestedInput = {
    create?: XOR<ImageTagCreateWithoutImageInput, ImageTagUncheckedCreateWithoutImageInput> | ImageTagCreateWithoutImageInput[] | ImageTagUncheckedCreateWithoutImageInput[]
    connectOrCreate?: ImageTagCreateOrConnectWithoutImageInput | ImageTagCreateOrConnectWithoutImageInput[]
    upsert?: ImageTagUpsertWithWhereUniqueWithoutImageInput | ImageTagUpsertWithWhereUniqueWithoutImageInput[]
    createMany?: ImageTagCreateManyImageInputEnvelope
    set?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
    disconnect?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
    delete?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
    connect?: ImageTagWhereUniqueInput | ImageTagWhereUniqueInput[]
    update?: ImageTagUpdateWithWhereUniqueWithoutImageInput | ImageTagUpdateWithWhereUniqueWithoutImageInput[]
    updateMany?: ImageTagUpdateManyWithWhereWithoutImageInput | ImageTagUpdateManyWithWhereWithoutImageInput[]
    deleteMany?: ImageTagScalarWhereInput | ImageTagScalarWhereInput[]
  }

  export type AITagImageUncheckedUpdateManyWithoutImageNestedInput = {
    create?: XOR<AITagImageCreateWithoutImageInput, AITagImageUncheckedCreateWithoutImageInput> | AITagImageCreateWithoutImageInput[] | AITagImageUncheckedCreateWithoutImageInput[]
    connectOrCreate?: AITagImageCreateOrConnectWithoutImageInput | AITagImageCreateOrConnectWithoutImageInput[]
    upsert?: AITagImageUpsertWithWhereUniqueWithoutImageInput | AITagImageUpsertWithWhereUniqueWithoutImageInput[]
    createMany?: AITagImageCreateManyImageInputEnvelope
    set?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    disconnect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    delete?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    connect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    update?: AITagImageUpdateWithWhereUniqueWithoutImageInput | AITagImageUpdateWithWhereUniqueWithoutImageInput[]
    updateMany?: AITagImageUpdateManyWithWhereWithoutImageInput | AITagImageUpdateManyWithWhereWithoutImageInput[]
    deleteMany?: AITagImageScalarWhereInput | AITagImageScalarWhereInput[]
  }

  export type ComparisonUncheckedUpdateManyWithoutUploadedImageNestedInput = {
    create?: XOR<ComparisonCreateWithoutUploadedImageInput, ComparisonUncheckedCreateWithoutUploadedImageInput> | ComparisonCreateWithoutUploadedImageInput[] | ComparisonUncheckedCreateWithoutUploadedImageInput[]
    connectOrCreate?: ComparisonCreateOrConnectWithoutUploadedImageInput | ComparisonCreateOrConnectWithoutUploadedImageInput[]
    upsert?: ComparisonUpsertWithWhereUniqueWithoutUploadedImageInput | ComparisonUpsertWithWhereUniqueWithoutUploadedImageInput[]
    createMany?: ComparisonCreateManyUploadedImageInputEnvelope
    set?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    disconnect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    delete?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    connect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    update?: ComparisonUpdateWithWhereUniqueWithoutUploadedImageInput | ComparisonUpdateWithWhereUniqueWithoutUploadedImageInput[]
    updateMany?: ComparisonUpdateManyWithWhereWithoutUploadedImageInput | ComparisonUpdateManyWithWhereWithoutUploadedImageInput[]
    deleteMany?: ComparisonScalarWhereInput | ComparisonScalarWhereInput[]
  }

  export type ImageCreateNestedOneWithoutModelInput = {
    create?: XOR<ImageCreateWithoutModelInput, ImageUncheckedCreateWithoutModelInput>
    connectOrCreate?: ImageCreateOrConnectWithoutModelInput
    connect?: ImageWhereUniqueInput
  }

  export type ComparisonCreateNestedManyWithoutMatchedModelInput = {
    create?: XOR<ComparisonCreateWithoutMatchedModelInput, ComparisonUncheckedCreateWithoutMatchedModelInput> | ComparisonCreateWithoutMatchedModelInput[] | ComparisonUncheckedCreateWithoutMatchedModelInput[]
    connectOrCreate?: ComparisonCreateOrConnectWithoutMatchedModelInput | ComparisonCreateOrConnectWithoutMatchedModelInput[]
    createMany?: ComparisonCreateManyMatchedModelInputEnvelope
    connect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
  }

  export type ComparisonUncheckedCreateNestedManyWithoutMatchedModelInput = {
    create?: XOR<ComparisonCreateWithoutMatchedModelInput, ComparisonUncheckedCreateWithoutMatchedModelInput> | ComparisonCreateWithoutMatchedModelInput[] | ComparisonUncheckedCreateWithoutMatchedModelInput[]
    connectOrCreate?: ComparisonCreateOrConnectWithoutMatchedModelInput | ComparisonCreateOrConnectWithoutMatchedModelInput[]
    createMany?: ComparisonCreateManyMatchedModelInputEnvelope
    connect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
  }

  export type ImageUpdateOneRequiredWithoutModelNestedInput = {
    create?: XOR<ImageCreateWithoutModelInput, ImageUncheckedCreateWithoutModelInput>
    connectOrCreate?: ImageCreateOrConnectWithoutModelInput
    upsert?: ImageUpsertWithoutModelInput
    connect?: ImageWhereUniqueInput
    update?: XOR<XOR<ImageUpdateToOneWithWhereWithoutModelInput, ImageUpdateWithoutModelInput>, ImageUncheckedUpdateWithoutModelInput>
  }

  export type ComparisonUpdateManyWithoutMatchedModelNestedInput = {
    create?: XOR<ComparisonCreateWithoutMatchedModelInput, ComparisonUncheckedCreateWithoutMatchedModelInput> | ComparisonCreateWithoutMatchedModelInput[] | ComparisonUncheckedCreateWithoutMatchedModelInput[]
    connectOrCreate?: ComparisonCreateOrConnectWithoutMatchedModelInput | ComparisonCreateOrConnectWithoutMatchedModelInput[]
    upsert?: ComparisonUpsertWithWhereUniqueWithoutMatchedModelInput | ComparisonUpsertWithWhereUniqueWithoutMatchedModelInput[]
    createMany?: ComparisonCreateManyMatchedModelInputEnvelope
    set?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    disconnect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    delete?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    connect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    update?: ComparisonUpdateWithWhereUniqueWithoutMatchedModelInput | ComparisonUpdateWithWhereUniqueWithoutMatchedModelInput[]
    updateMany?: ComparisonUpdateManyWithWhereWithoutMatchedModelInput | ComparisonUpdateManyWithWhereWithoutMatchedModelInput[]
    deleteMany?: ComparisonScalarWhereInput | ComparisonScalarWhereInput[]
  }

  export type ComparisonUncheckedUpdateManyWithoutMatchedModelNestedInput = {
    create?: XOR<ComparisonCreateWithoutMatchedModelInput, ComparisonUncheckedCreateWithoutMatchedModelInput> | ComparisonCreateWithoutMatchedModelInput[] | ComparisonUncheckedCreateWithoutMatchedModelInput[]
    connectOrCreate?: ComparisonCreateOrConnectWithoutMatchedModelInput | ComparisonCreateOrConnectWithoutMatchedModelInput[]
    upsert?: ComparisonUpsertWithWhereUniqueWithoutMatchedModelInput | ComparisonUpsertWithWhereUniqueWithoutMatchedModelInput[]
    createMany?: ComparisonCreateManyMatchedModelInputEnvelope
    set?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    disconnect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    delete?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    connect?: ComparisonWhereUniqueInput | ComparisonWhereUniqueInput[]
    update?: ComparisonUpdateWithWhereUniqueWithoutMatchedModelInput | ComparisonUpdateWithWhereUniqueWithoutMatchedModelInput[]
    updateMany?: ComparisonUpdateManyWithWhereWithoutMatchedModelInput | ComparisonUpdateManyWithWhereWithoutMatchedModelInput[]
    deleteMany?: ComparisonScalarWhereInput | ComparisonScalarWhereInput[]
  }

  export type AITagImageCreateNestedManyWithoutTagInput = {
    create?: XOR<AITagImageCreateWithoutTagInput, AITagImageUncheckedCreateWithoutTagInput> | AITagImageCreateWithoutTagInput[] | AITagImageUncheckedCreateWithoutTagInput[]
    connectOrCreate?: AITagImageCreateOrConnectWithoutTagInput | AITagImageCreateOrConnectWithoutTagInput[]
    createMany?: AITagImageCreateManyTagInputEnvelope
    connect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
  }

  export type AITagImageUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<AITagImageCreateWithoutTagInput, AITagImageUncheckedCreateWithoutTagInput> | AITagImageCreateWithoutTagInput[] | AITagImageUncheckedCreateWithoutTagInput[]
    connectOrCreate?: AITagImageCreateOrConnectWithoutTagInput | AITagImageCreateOrConnectWithoutTagInput[]
    createMany?: AITagImageCreateManyTagInputEnvelope
    connect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
  }

  export type AITagImageUpdateManyWithoutTagNestedInput = {
    create?: XOR<AITagImageCreateWithoutTagInput, AITagImageUncheckedCreateWithoutTagInput> | AITagImageCreateWithoutTagInput[] | AITagImageUncheckedCreateWithoutTagInput[]
    connectOrCreate?: AITagImageCreateOrConnectWithoutTagInput | AITagImageCreateOrConnectWithoutTagInput[]
    upsert?: AITagImageUpsertWithWhereUniqueWithoutTagInput | AITagImageUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: AITagImageCreateManyTagInputEnvelope
    set?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    disconnect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    delete?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    connect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    update?: AITagImageUpdateWithWhereUniqueWithoutTagInput | AITagImageUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: AITagImageUpdateManyWithWhereWithoutTagInput | AITagImageUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: AITagImageScalarWhereInput | AITagImageScalarWhereInput[]
  }

  export type AITagImageUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<AITagImageCreateWithoutTagInput, AITagImageUncheckedCreateWithoutTagInput> | AITagImageCreateWithoutTagInput[] | AITagImageUncheckedCreateWithoutTagInput[]
    connectOrCreate?: AITagImageCreateOrConnectWithoutTagInput | AITagImageCreateOrConnectWithoutTagInput[]
    upsert?: AITagImageUpsertWithWhereUniqueWithoutTagInput | AITagImageUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: AITagImageCreateManyTagInputEnvelope
    set?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    disconnect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    delete?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    connect?: AITagImageWhereUniqueInput | AITagImageWhereUniqueInput[]
    update?: AITagImageUpdateWithWhereUniqueWithoutTagInput | AITagImageUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: AITagImageUpdateManyWithWhereWithoutTagInput | AITagImageUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: AITagImageScalarWhereInput | AITagImageScalarWhereInput[]
  }

  export type ImageCreateNestedOneWithoutAiTagsInput = {
    create?: XOR<ImageCreateWithoutAiTagsInput, ImageUncheckedCreateWithoutAiTagsInput>
    connectOrCreate?: ImageCreateOrConnectWithoutAiTagsInput
    connect?: ImageWhereUniqueInput
  }

  export type AITagCreateNestedOneWithoutImagesInput = {
    create?: XOR<AITagCreateWithoutImagesInput, AITagUncheckedCreateWithoutImagesInput>
    connectOrCreate?: AITagCreateOrConnectWithoutImagesInput
    connect?: AITagWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ImageUpdateOneRequiredWithoutAiTagsNestedInput = {
    create?: XOR<ImageCreateWithoutAiTagsInput, ImageUncheckedCreateWithoutAiTagsInput>
    connectOrCreate?: ImageCreateOrConnectWithoutAiTagsInput
    upsert?: ImageUpsertWithoutAiTagsInput
    connect?: ImageWhereUniqueInput
    update?: XOR<XOR<ImageUpdateToOneWithWhereWithoutAiTagsInput, ImageUpdateWithoutAiTagsInput>, ImageUncheckedUpdateWithoutAiTagsInput>
  }

  export type AITagUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<AITagCreateWithoutImagesInput, AITagUncheckedCreateWithoutImagesInput>
    connectOrCreate?: AITagCreateOrConnectWithoutImagesInput
    upsert?: AITagUpsertWithoutImagesInput
    connect?: AITagWhereUniqueInput
    update?: XOR<XOR<AITagUpdateToOneWithWhereWithoutImagesInput, AITagUpdateWithoutImagesInput>, AITagUncheckedUpdateWithoutImagesInput>
  }

  export type ImageCreateNestedOneWithoutTagsInput = {
    create?: XOR<ImageCreateWithoutTagsInput, ImageUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ImageCreateOrConnectWithoutTagsInput
    connect?: ImageWhereUniqueInput
  }

  export type ImageUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<ImageCreateWithoutTagsInput, ImageUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ImageCreateOrConnectWithoutTagsInput
    upsert?: ImageUpsertWithoutTagsInput
    connect?: ImageWhereUniqueInput
    update?: XOR<XOR<ImageUpdateToOneWithWhereWithoutTagsInput, ImageUpdateWithoutTagsInput>, ImageUncheckedUpdateWithoutTagsInput>
  }

  export type ImageCreateNestedOneWithoutComparisonsInput = {
    create?: XOR<ImageCreateWithoutComparisonsInput, ImageUncheckedCreateWithoutComparisonsInput>
    connectOrCreate?: ImageCreateOrConnectWithoutComparisonsInput
    connect?: ImageWhereUniqueInput
  }

  export type ModelCreateNestedOneWithoutComparisonsInput = {
    create?: XOR<ModelCreateWithoutComparisonsInput, ModelUncheckedCreateWithoutComparisonsInput>
    connectOrCreate?: ModelCreateOrConnectWithoutComparisonsInput
    connect?: ModelWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ImageUpdateOneRequiredWithoutComparisonsNestedInput = {
    create?: XOR<ImageCreateWithoutComparisonsInput, ImageUncheckedCreateWithoutComparisonsInput>
    connectOrCreate?: ImageCreateOrConnectWithoutComparisonsInput
    upsert?: ImageUpsertWithoutComparisonsInput
    connect?: ImageWhereUniqueInput
    update?: XOR<XOR<ImageUpdateToOneWithWhereWithoutComparisonsInput, ImageUpdateWithoutComparisonsInput>, ImageUncheckedUpdateWithoutComparisonsInput>
  }

  export type ModelUpdateOneRequiredWithoutComparisonsNestedInput = {
    create?: XOR<ModelCreateWithoutComparisonsInput, ModelUncheckedCreateWithoutComparisonsInput>
    connectOrCreate?: ModelCreateOrConnectWithoutComparisonsInput
    upsert?: ModelUpsertWithoutComparisonsInput
    connect?: ModelWhereUniqueInput
    update?: XOR<XOR<ModelUpdateToOneWithWhereWithoutComparisonsInput, ModelUpdateWithoutComparisonsInput>, ModelUncheckedUpdateWithoutComparisonsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ModelCreateWithoutImageInput = {
    id?: string
    fileName: string
    fileUrl: string
    format?: string | null
    size?: number | null
    parameters?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comparisons?: ComparisonCreateNestedManyWithoutMatchedModelInput
  }

  export type ModelUncheckedCreateWithoutImageInput = {
    id?: string
    fileName: string
    fileUrl: string
    format?: string | null
    size?: number | null
    parameters?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comparisons?: ComparisonUncheckedCreateNestedManyWithoutMatchedModelInput
  }

  export type ModelCreateOrConnectWithoutImageInput = {
    where: ModelWhereUniqueInput
    create: XOR<ModelCreateWithoutImageInput, ModelUncheckedCreateWithoutImageInput>
  }

  export type ImageTagCreateWithoutImageInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type ImageTagUncheckedCreateWithoutImageInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type ImageTagCreateOrConnectWithoutImageInput = {
    where: ImageTagWhereUniqueInput
    create: XOR<ImageTagCreateWithoutImageInput, ImageTagUncheckedCreateWithoutImageInput>
  }

  export type ImageTagCreateManyImageInputEnvelope = {
    data: ImageTagCreateManyImageInput | ImageTagCreateManyImageInput[]
  }

  export type AITagImageCreateWithoutImageInput = {
    id?: string
    confidence: number
    createdAt?: Date | string
    tag: AITagCreateNestedOneWithoutImagesInput
  }

  export type AITagImageUncheckedCreateWithoutImageInput = {
    id?: string
    confidence: number
    createdAt?: Date | string
    tagId: string
  }

  export type AITagImageCreateOrConnectWithoutImageInput = {
    where: AITagImageWhereUniqueInput
    create: XOR<AITagImageCreateWithoutImageInput, AITagImageUncheckedCreateWithoutImageInput>
  }

  export type AITagImageCreateManyImageInputEnvelope = {
    data: AITagImageCreateManyImageInput | AITagImageCreateManyImageInput[]
  }

  export type ComparisonCreateWithoutUploadedImageInput = {
    id?: string
    similarityScore?: number | null
    createdAt?: Date | string
    matchedModel: ModelCreateNestedOneWithoutComparisonsInput
  }

  export type ComparisonUncheckedCreateWithoutUploadedImageInput = {
    id?: string
    similarityScore?: number | null
    createdAt?: Date | string
    matchedModelId: string
  }

  export type ComparisonCreateOrConnectWithoutUploadedImageInput = {
    where: ComparisonWhereUniqueInput
    create: XOR<ComparisonCreateWithoutUploadedImageInput, ComparisonUncheckedCreateWithoutUploadedImageInput>
  }

  export type ComparisonCreateManyUploadedImageInputEnvelope = {
    data: ComparisonCreateManyUploadedImageInput | ComparisonCreateManyUploadedImageInput[]
  }

  export type ModelUpsertWithoutImageInput = {
    update: XOR<ModelUpdateWithoutImageInput, ModelUncheckedUpdateWithoutImageInput>
    create: XOR<ModelCreateWithoutImageInput, ModelUncheckedCreateWithoutImageInput>
    where?: ModelWhereInput
  }

  export type ModelUpdateToOneWithWhereWithoutImageInput = {
    where?: ModelWhereInput
    data: XOR<ModelUpdateWithoutImageInput, ModelUncheckedUpdateWithoutImageInput>
  }

  export type ModelUpdateWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comparisons?: ComparisonUpdateManyWithoutMatchedModelNestedInput
  }

  export type ModelUncheckedUpdateWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comparisons?: ComparisonUncheckedUpdateManyWithoutMatchedModelNestedInput
  }

  export type ImageTagUpsertWithWhereUniqueWithoutImageInput = {
    where: ImageTagWhereUniqueInput
    update: XOR<ImageTagUpdateWithoutImageInput, ImageTagUncheckedUpdateWithoutImageInput>
    create: XOR<ImageTagCreateWithoutImageInput, ImageTagUncheckedCreateWithoutImageInput>
  }

  export type ImageTagUpdateWithWhereUniqueWithoutImageInput = {
    where: ImageTagWhereUniqueInput
    data: XOR<ImageTagUpdateWithoutImageInput, ImageTagUncheckedUpdateWithoutImageInput>
  }

  export type ImageTagUpdateManyWithWhereWithoutImageInput = {
    where: ImageTagScalarWhereInput
    data: XOR<ImageTagUpdateManyMutationInput, ImageTagUncheckedUpdateManyWithoutImageInput>
  }

  export type ImageTagScalarWhereInput = {
    AND?: ImageTagScalarWhereInput | ImageTagScalarWhereInput[]
    OR?: ImageTagScalarWhereInput[]
    NOT?: ImageTagScalarWhereInput | ImageTagScalarWhereInput[]
    id?: StringFilter<"ImageTag"> | string
    name?: StringFilter<"ImageTag"> | string
    createdAt?: DateTimeFilter<"ImageTag"> | Date | string
    imageId?: StringFilter<"ImageTag"> | string
  }

  export type AITagImageUpsertWithWhereUniqueWithoutImageInput = {
    where: AITagImageWhereUniqueInput
    update: XOR<AITagImageUpdateWithoutImageInput, AITagImageUncheckedUpdateWithoutImageInput>
    create: XOR<AITagImageCreateWithoutImageInput, AITagImageUncheckedCreateWithoutImageInput>
  }

  export type AITagImageUpdateWithWhereUniqueWithoutImageInput = {
    where: AITagImageWhereUniqueInput
    data: XOR<AITagImageUpdateWithoutImageInput, AITagImageUncheckedUpdateWithoutImageInput>
  }

  export type AITagImageUpdateManyWithWhereWithoutImageInput = {
    where: AITagImageScalarWhereInput
    data: XOR<AITagImageUpdateManyMutationInput, AITagImageUncheckedUpdateManyWithoutImageInput>
  }

  export type AITagImageScalarWhereInput = {
    AND?: AITagImageScalarWhereInput | AITagImageScalarWhereInput[]
    OR?: AITagImageScalarWhereInput[]
    NOT?: AITagImageScalarWhereInput | AITagImageScalarWhereInput[]
    id?: StringFilter<"AITagImage"> | string
    confidence?: FloatFilter<"AITagImage"> | number
    createdAt?: DateTimeFilter<"AITagImage"> | Date | string
    imageId?: StringFilter<"AITagImage"> | string
    tagId?: StringFilter<"AITagImage"> | string
  }

  export type ComparisonUpsertWithWhereUniqueWithoutUploadedImageInput = {
    where: ComparisonWhereUniqueInput
    update: XOR<ComparisonUpdateWithoutUploadedImageInput, ComparisonUncheckedUpdateWithoutUploadedImageInput>
    create: XOR<ComparisonCreateWithoutUploadedImageInput, ComparisonUncheckedCreateWithoutUploadedImageInput>
  }

  export type ComparisonUpdateWithWhereUniqueWithoutUploadedImageInput = {
    where: ComparisonWhereUniqueInput
    data: XOR<ComparisonUpdateWithoutUploadedImageInput, ComparisonUncheckedUpdateWithoutUploadedImageInput>
  }

  export type ComparisonUpdateManyWithWhereWithoutUploadedImageInput = {
    where: ComparisonScalarWhereInput
    data: XOR<ComparisonUpdateManyMutationInput, ComparisonUncheckedUpdateManyWithoutUploadedImageInput>
  }

  export type ComparisonScalarWhereInput = {
    AND?: ComparisonScalarWhereInput | ComparisonScalarWhereInput[]
    OR?: ComparisonScalarWhereInput[]
    NOT?: ComparisonScalarWhereInput | ComparisonScalarWhereInput[]
    id?: StringFilter<"Comparison"> | string
    similarityScore?: FloatNullableFilter<"Comparison"> | number | null
    createdAt?: DateTimeFilter<"Comparison"> | Date | string
    uploadedImageId?: StringFilter<"Comparison"> | string
    matchedModelId?: StringFilter<"Comparison"> | string
  }

  export type ImageCreateWithoutModelInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ImageTagCreateNestedManyWithoutImageInput
    aiTags?: AITagImageCreateNestedManyWithoutImageInput
    comparisons?: ComparisonCreateNestedManyWithoutUploadedImageInput
  }

  export type ImageUncheckedCreateWithoutModelInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ImageTagUncheckedCreateNestedManyWithoutImageInput
    aiTags?: AITagImageUncheckedCreateNestedManyWithoutImageInput
    comparisons?: ComparisonUncheckedCreateNestedManyWithoutUploadedImageInput
  }

  export type ImageCreateOrConnectWithoutModelInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutModelInput, ImageUncheckedCreateWithoutModelInput>
  }

  export type ComparisonCreateWithoutMatchedModelInput = {
    id?: string
    similarityScore?: number | null
    createdAt?: Date | string
    uploadedImage: ImageCreateNestedOneWithoutComparisonsInput
  }

  export type ComparisonUncheckedCreateWithoutMatchedModelInput = {
    id?: string
    similarityScore?: number | null
    createdAt?: Date | string
    uploadedImageId: string
  }

  export type ComparisonCreateOrConnectWithoutMatchedModelInput = {
    where: ComparisonWhereUniqueInput
    create: XOR<ComparisonCreateWithoutMatchedModelInput, ComparisonUncheckedCreateWithoutMatchedModelInput>
  }

  export type ComparisonCreateManyMatchedModelInputEnvelope = {
    data: ComparisonCreateManyMatchedModelInput | ComparisonCreateManyMatchedModelInput[]
  }

  export type ImageUpsertWithoutModelInput = {
    update: XOR<ImageUpdateWithoutModelInput, ImageUncheckedUpdateWithoutModelInput>
    create: XOR<ImageCreateWithoutModelInput, ImageUncheckedCreateWithoutModelInput>
    where?: ImageWhereInput
  }

  export type ImageUpdateToOneWithWhereWithoutModelInput = {
    where?: ImageWhereInput
    data: XOR<ImageUpdateWithoutModelInput, ImageUncheckedUpdateWithoutModelInput>
  }

  export type ImageUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ImageTagUpdateManyWithoutImageNestedInput
    aiTags?: AITagImageUpdateManyWithoutImageNestedInput
    comparisons?: ComparisonUpdateManyWithoutUploadedImageNestedInput
  }

  export type ImageUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ImageTagUncheckedUpdateManyWithoutImageNestedInput
    aiTags?: AITagImageUncheckedUpdateManyWithoutImageNestedInput
    comparisons?: ComparisonUncheckedUpdateManyWithoutUploadedImageNestedInput
  }

  export type ComparisonUpsertWithWhereUniqueWithoutMatchedModelInput = {
    where: ComparisonWhereUniqueInput
    update: XOR<ComparisonUpdateWithoutMatchedModelInput, ComparisonUncheckedUpdateWithoutMatchedModelInput>
    create: XOR<ComparisonCreateWithoutMatchedModelInput, ComparisonUncheckedCreateWithoutMatchedModelInput>
  }

  export type ComparisonUpdateWithWhereUniqueWithoutMatchedModelInput = {
    where: ComparisonWhereUniqueInput
    data: XOR<ComparisonUpdateWithoutMatchedModelInput, ComparisonUncheckedUpdateWithoutMatchedModelInput>
  }

  export type ComparisonUpdateManyWithWhereWithoutMatchedModelInput = {
    where: ComparisonScalarWhereInput
    data: XOR<ComparisonUpdateManyMutationInput, ComparisonUncheckedUpdateManyWithoutMatchedModelInput>
  }

  export type AITagImageCreateWithoutTagInput = {
    id?: string
    confidence: number
    createdAt?: Date | string
    image: ImageCreateNestedOneWithoutAiTagsInput
  }

  export type AITagImageUncheckedCreateWithoutTagInput = {
    id?: string
    confidence: number
    createdAt?: Date | string
    imageId: string
  }

  export type AITagImageCreateOrConnectWithoutTagInput = {
    where: AITagImageWhereUniqueInput
    create: XOR<AITagImageCreateWithoutTagInput, AITagImageUncheckedCreateWithoutTagInput>
  }

  export type AITagImageCreateManyTagInputEnvelope = {
    data: AITagImageCreateManyTagInput | AITagImageCreateManyTagInput[]
  }

  export type AITagImageUpsertWithWhereUniqueWithoutTagInput = {
    where: AITagImageWhereUniqueInput
    update: XOR<AITagImageUpdateWithoutTagInput, AITagImageUncheckedUpdateWithoutTagInput>
    create: XOR<AITagImageCreateWithoutTagInput, AITagImageUncheckedCreateWithoutTagInput>
  }

  export type AITagImageUpdateWithWhereUniqueWithoutTagInput = {
    where: AITagImageWhereUniqueInput
    data: XOR<AITagImageUpdateWithoutTagInput, AITagImageUncheckedUpdateWithoutTagInput>
  }

  export type AITagImageUpdateManyWithWhereWithoutTagInput = {
    where: AITagImageScalarWhereInput
    data: XOR<AITagImageUpdateManyMutationInput, AITagImageUncheckedUpdateManyWithoutTagInput>
  }

  export type ImageCreateWithoutAiTagsInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    model?: ModelCreateNestedOneWithoutImageInput
    tags?: ImageTagCreateNestedManyWithoutImageInput
    comparisons?: ComparisonCreateNestedManyWithoutUploadedImageInput
  }

  export type ImageUncheckedCreateWithoutAiTagsInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    model?: ModelUncheckedCreateNestedOneWithoutImageInput
    tags?: ImageTagUncheckedCreateNestedManyWithoutImageInput
    comparisons?: ComparisonUncheckedCreateNestedManyWithoutUploadedImageInput
  }

  export type ImageCreateOrConnectWithoutAiTagsInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutAiTagsInput, ImageUncheckedCreateWithoutAiTagsInput>
  }

  export type AITagCreateWithoutImagesInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AITagUncheckedCreateWithoutImagesInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AITagCreateOrConnectWithoutImagesInput = {
    where: AITagWhereUniqueInput
    create: XOR<AITagCreateWithoutImagesInput, AITagUncheckedCreateWithoutImagesInput>
  }

  export type ImageUpsertWithoutAiTagsInput = {
    update: XOR<ImageUpdateWithoutAiTagsInput, ImageUncheckedUpdateWithoutAiTagsInput>
    create: XOR<ImageCreateWithoutAiTagsInput, ImageUncheckedCreateWithoutAiTagsInput>
    where?: ImageWhereInput
  }

  export type ImageUpdateToOneWithWhereWithoutAiTagsInput = {
    where?: ImageWhereInput
    data: XOR<ImageUpdateWithoutAiTagsInput, ImageUncheckedUpdateWithoutAiTagsInput>
  }

  export type ImageUpdateWithoutAiTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUpdateOneWithoutImageNestedInput
    tags?: ImageTagUpdateManyWithoutImageNestedInput
    comparisons?: ComparisonUpdateManyWithoutUploadedImageNestedInput
  }

  export type ImageUncheckedUpdateWithoutAiTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUncheckedUpdateOneWithoutImageNestedInput
    tags?: ImageTagUncheckedUpdateManyWithoutImageNestedInput
    comparisons?: ComparisonUncheckedUpdateManyWithoutUploadedImageNestedInput
  }

  export type AITagUpsertWithoutImagesInput = {
    update: XOR<AITagUpdateWithoutImagesInput, AITagUncheckedUpdateWithoutImagesInput>
    create: XOR<AITagCreateWithoutImagesInput, AITagUncheckedCreateWithoutImagesInput>
    where?: AITagWhereInput
  }

  export type AITagUpdateToOneWithWhereWithoutImagesInput = {
    where?: AITagWhereInput
    data: XOR<AITagUpdateWithoutImagesInput, AITagUncheckedUpdateWithoutImagesInput>
  }

  export type AITagUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITagUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageCreateWithoutTagsInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    model?: ModelCreateNestedOneWithoutImageInput
    aiTags?: AITagImageCreateNestedManyWithoutImageInput
    comparisons?: ComparisonCreateNestedManyWithoutUploadedImageInput
  }

  export type ImageUncheckedCreateWithoutTagsInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    model?: ModelUncheckedCreateNestedOneWithoutImageInput
    aiTags?: AITagImageUncheckedCreateNestedManyWithoutImageInput
    comparisons?: ComparisonUncheckedCreateNestedManyWithoutUploadedImageInput
  }

  export type ImageCreateOrConnectWithoutTagsInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutTagsInput, ImageUncheckedCreateWithoutTagsInput>
  }

  export type ImageUpsertWithoutTagsInput = {
    update: XOR<ImageUpdateWithoutTagsInput, ImageUncheckedUpdateWithoutTagsInput>
    create: XOR<ImageCreateWithoutTagsInput, ImageUncheckedCreateWithoutTagsInput>
    where?: ImageWhereInput
  }

  export type ImageUpdateToOneWithWhereWithoutTagsInput = {
    where?: ImageWhereInput
    data: XOR<ImageUpdateWithoutTagsInput, ImageUncheckedUpdateWithoutTagsInput>
  }

  export type ImageUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUpdateOneWithoutImageNestedInput
    aiTags?: AITagImageUpdateManyWithoutImageNestedInput
    comparisons?: ComparisonUpdateManyWithoutUploadedImageNestedInput
  }

  export type ImageUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUncheckedUpdateOneWithoutImageNestedInput
    aiTags?: AITagImageUncheckedUpdateManyWithoutImageNestedInput
    comparisons?: ComparisonUncheckedUpdateManyWithoutUploadedImageNestedInput
  }

  export type ImageCreateWithoutComparisonsInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    model?: ModelCreateNestedOneWithoutImageInput
    tags?: ImageTagCreateNestedManyWithoutImageInput
    aiTags?: AITagImageCreateNestedManyWithoutImageInput
  }

  export type ImageUncheckedCreateWithoutComparisonsInput = {
    id?: string
    fileName: string
    fileUrl: string
    mimeType?: string | null
    size?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    model?: ModelUncheckedCreateNestedOneWithoutImageInput
    tags?: ImageTagUncheckedCreateNestedManyWithoutImageInput
    aiTags?: AITagImageUncheckedCreateNestedManyWithoutImageInput
  }

  export type ImageCreateOrConnectWithoutComparisonsInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutComparisonsInput, ImageUncheckedCreateWithoutComparisonsInput>
  }

  export type ModelCreateWithoutComparisonsInput = {
    id?: string
    fileName: string
    fileUrl: string
    format?: string | null
    size?: number | null
    parameters?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    image: ImageCreateNestedOneWithoutModelInput
  }

  export type ModelUncheckedCreateWithoutComparisonsInput = {
    id?: string
    fileName: string
    fileUrl: string
    format?: string | null
    size?: number | null
    parameters?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    imageId: string
  }

  export type ModelCreateOrConnectWithoutComparisonsInput = {
    where: ModelWhereUniqueInput
    create: XOR<ModelCreateWithoutComparisonsInput, ModelUncheckedCreateWithoutComparisonsInput>
  }

  export type ImageUpsertWithoutComparisonsInput = {
    update: XOR<ImageUpdateWithoutComparisonsInput, ImageUncheckedUpdateWithoutComparisonsInput>
    create: XOR<ImageCreateWithoutComparisonsInput, ImageUncheckedCreateWithoutComparisonsInput>
    where?: ImageWhereInput
  }

  export type ImageUpdateToOneWithWhereWithoutComparisonsInput = {
    where?: ImageWhereInput
    data: XOR<ImageUpdateWithoutComparisonsInput, ImageUncheckedUpdateWithoutComparisonsInput>
  }

  export type ImageUpdateWithoutComparisonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUpdateOneWithoutImageNestedInput
    tags?: ImageTagUpdateManyWithoutImageNestedInput
    aiTags?: AITagImageUpdateManyWithoutImageNestedInput
  }

  export type ImageUncheckedUpdateWithoutComparisonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUncheckedUpdateOneWithoutImageNestedInput
    tags?: ImageTagUncheckedUpdateManyWithoutImageNestedInput
    aiTags?: AITagImageUncheckedUpdateManyWithoutImageNestedInput
  }

  export type ModelUpsertWithoutComparisonsInput = {
    update: XOR<ModelUpdateWithoutComparisonsInput, ModelUncheckedUpdateWithoutComparisonsInput>
    create: XOR<ModelCreateWithoutComparisonsInput, ModelUncheckedCreateWithoutComparisonsInput>
    where?: ModelWhereInput
  }

  export type ModelUpdateToOneWithWhereWithoutComparisonsInput = {
    where?: ModelWhereInput
    data: XOR<ModelUpdateWithoutComparisonsInput, ModelUncheckedUpdateWithoutComparisonsInput>
  }

  export type ModelUpdateWithoutComparisonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ImageUpdateOneRequiredWithoutModelNestedInput
  }

  export type ModelUncheckedUpdateWithoutComparisonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageId?: StringFieldUpdateOperationsInput | string
  }

  export type ImageTagCreateManyImageInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type AITagImageCreateManyImageInput = {
    id?: string
    confidence: number
    createdAt?: Date | string
    tagId: string
  }

  export type ComparisonCreateManyUploadedImageInput = {
    id?: string
    similarityScore?: number | null
    createdAt?: Date | string
    matchedModelId: string
  }

  export type ImageTagUpdateWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageTagUncheckedUpdateWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageTagUncheckedUpdateManyWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITagImageUpdateWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tag?: AITagUpdateOneRequiredWithoutImagesNestedInput
  }

  export type AITagImageUncheckedUpdateWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type AITagImageUncheckedUpdateManyWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ComparisonUpdateWithoutUploadedImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedModel?: ModelUpdateOneRequiredWithoutComparisonsNestedInput
  }

  export type ComparisonUncheckedUpdateWithoutUploadedImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedModelId?: StringFieldUpdateOperationsInput | string
  }

  export type ComparisonUncheckedUpdateManyWithoutUploadedImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedModelId?: StringFieldUpdateOperationsInput | string
  }

  export type ComparisonCreateManyMatchedModelInput = {
    id?: string
    similarityScore?: number | null
    createdAt?: Date | string
    uploadedImageId: string
  }

  export type ComparisonUpdateWithoutMatchedModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedImage?: ImageUpdateOneRequiredWithoutComparisonsNestedInput
  }

  export type ComparisonUncheckedUpdateWithoutMatchedModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedImageId?: StringFieldUpdateOperationsInput | string
  }

  export type ComparisonUncheckedUpdateManyWithoutMatchedModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedImageId?: StringFieldUpdateOperationsInput | string
  }

  export type AITagImageCreateManyTagInput = {
    id?: string
    confidence: number
    createdAt?: Date | string
    imageId: string
  }

  export type AITagImageUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ImageUpdateOneRequiredWithoutAiTagsNestedInput
  }

  export type AITagImageUncheckedUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageId?: StringFieldUpdateOperationsInput | string
  }

  export type AITagImageUncheckedUpdateManyWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}