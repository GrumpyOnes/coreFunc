 
function* helloWorldGenerator() {
    console.log('this is begin');
    const a = yield 'hello';
    console.log('this is a',a);
    const b = yield 'world';
    console.log('this is b',b);
    return 'ending';
  }
  var hw = helloWorldGenerator();

  hw.next(1)
  /**
   * 'this is begin'
   * {value: "hello", done: false}
   * 
   * 
   * 此时执行的是进入方法后，打印 this is begin， 到 yield 'hello'，抛出{value: "hello", done: false}
   * 同时把next指针 赋值给 a，即 a= next(n){ return n;}
  */
   hw.next(2)
   /**
    * this is a 2
    * {value: "world", done: false}
    * 
    * 
    * 再次运行next时，相当于执行上一次的a=next(2);等价与a=2，打印 this is a 2；然后继续运行到yield ’world‘ 抛出抛出{value: "world", done: false}；
    * 把next指针赋值给b ，b= next(n){ return n;}
    * 以此类推
   */
    hw.next(3)
    /**
     * this is b 3
     * {value: "ending", done: true}
    */