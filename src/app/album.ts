export class Album {
    constructor(
      public id:string,
      public ref:string,
      public name:string,
      public title:string,
      public description:string,
      public duration:number,
      public status:string,
      public like?:string,
      public url?:string,
      public tags?:string[]
    ){}
}

export interface List {
  id:string,
  list:Array<string>,
}

// export class List {
//   constructor(
//     public id:string,
//     public list:string[],
//   ){
//     this.id = id;
//     this.list = list;
//   }
// }