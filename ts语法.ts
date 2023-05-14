function add(a) {
  return a;
} //可以省略类型，但不推荐
add(1);
/* 箭头函数写法 */
{
  var f: (a: number, b: number) => number = (a, b) => {
    return a + b;
  };
}
/* class */
{
  class P {
    pname: string;
    page: number;
    constructor(name: string, age: number) {
      this.pname = name;
      this.page = age;
    }
  }
}
/* 修饰符 */
{
  class Person {
    protected name: string; /* protected只能在类以及子类的内部调用 */
  }
  class Kid extends Person {
    run() {
      return this.name;
    }
  }
  let k = new Kid();
  // k.name会报错,k.run()不会
  k.run();
}
/* 
抽象类就是搭一个空架子而不实现任何功能，所有功能由extends它的class实现
*/
{
  abstract class Man {
    abstract name: string;
    abstract run(): any;
  }
  class RealMan extends Man {
    name: "lzl";
    run(): string {
      return this.name;
    }
  }
}
/* implements代表实现，接口设定规范，class实现规范 */
{
  interface IData {
    name: string,
    age: number;
  }
  interface IMove {
    hobby(): string;
  }
  class Boy implements IData, IMove {
    name: string;
    age: number;
    hobby(): string {
      return "1";
    }
  }
}
/* 
    泛型就是不写死类型种类，而是指定类型的统一和数量
*/
{
  function generic<T, U>(a: T, b: U) {}
  generic<number, string>(1, "1");
  generic<number[], boolean>([1], false);

  function fe<T extends string | string[]>(a: T): number {
    return a.length;
  }
  fe<string>("1");
  fe<string[]>(["1"]);
  //fe<number[]>() -->这种情况下使用number就不可以了,j即使number[]由length
  //此刻该用interface
  interface ILen {
    length: number;
  }
  function fl<T extends ILen>(a: T): number {
    return a.length;
  }
  fl<number[]>([1]);
}
/* 装饰器 */
/* {
  let dec: ClassDecorator = (target) => {
    target.prototype.name = "human";
  };
  @dec
  class Human {}
  let h = new Human();
  //要传参再加一层并调用
  function decotator(opt:any){
    return function(target:any){
        target.prototype.name=opt.name
    }
  }
  @decotator({name:'传参'})
  class AnotherHuman{}
} */
