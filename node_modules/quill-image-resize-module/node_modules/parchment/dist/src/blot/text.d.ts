import { Blot, Leaf } from './abstract/blot';
import LeafBlot from './abstract/leaf';
import * as Registry from '../registry';
declare class TextBlot extends LeafBlot implements Leaf {
    static blotName: string;
    static scope: Registry.Scope;
    domNode: Text;
    protected text: string;
    static create(value: string): Text;
    static value(domNode: Text): string;
    constructor(node: Node);
    deleteAt(index: number, length: number): void;
    index(node: any, offset: any): number;
    insertAt(index: number, value: string, def?: any): void;
    length(): number;
    optimize(): void;
    position(index: number, inclusive?: boolean): [Node, number];
    split(index: number, force?: boolean): Blot;
    update(mutations: MutationRecord[]): void;
    value(): string;
}
export default TextBlot;
