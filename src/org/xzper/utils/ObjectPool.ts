/**
 * Created by xzp on 2014/6/18.
 */

module game {
    export class ObjectPool {

        private static pool:Object = {};

        private list:Array<any>;

        private className:string;

        public constructor(className:string)
        {
            this.className = className;
            this.list = [];
        }

        /**
         * 获取对象
         */
        public borrowObject():any {
            if (this.list.length > 0) {
                return this.list.shift();
            }
            var clazz:any = egret.getDefinitionByName(this.className);
            return new clazz();
        }

        /**
         * 回收对象
         */
        public returnObject(value:any):void {
            this.list.push(value);
        }

        public static getPool(className:string):ObjectPool {
            if (!ObjectPool.pool[className]) {
                ObjectPool.pool[className] = new ObjectPool(className);
            }
            return ObjectPool.pool[className];
        }
    }
}