import { BadRequestException } from "@nestjs/common";

type Operation = '+' | '-' | '*' | ':';

export class Task {
    operation: Operation;
    left: number;
    right: number;

    constructor(operation: Operation, left: number, right: number) {
        this.operation = operation;
        this.left = left;
        this.right = right;
    }

    static parse(data: Pick<Task, 'operation' | 'left' | 'right'>) {
        return new Task(data.operation, data.left, data.right);
    }

    static formTask(s: string): Task {
        const parts = this.getParts(s);
        console.log(parts)
        if (parts.parts.length !== 2) {
            throw new BadRequestException('Не поддерживаемый формат операции');
        }

        console.log(parts);

        const left = +parts.parts[0];
        const right = +parts.parts[1];
        if (isNaN(left) || isNaN(right)) {
            console.log(parts[0], left, parts[1], right);
            throw new BadRequestException('оба аргумента должны быть числами');
        }
        return Task.parse({ left, right, operation: parts.operation })
    }

    private static getParts(s: string): { parts: string[], operation: Operation } {
        if (s.includes('+')) {
            return { operation: '+', parts: s.split('+') };
        } else if (s.includes('-')) {
            return { operation: '-', parts: s.split('-') };
        } else if (s.includes('*')) {
            return { operation: '*', parts: s.split('*') };
        } else if (s.includes(':')) {
            return { operation: ':', parts: s.split(':') };
        } else {
            throw new BadRequestException('Не поддерживаемая операция');
        }
    }

    execute() {
        switch (this.operation) {
            case '+': return this.left + this.right;
            case '-': return this.left - this.right;
            case '*': return this.left * this.right;
            case ':': return this.left / this.right;
            default:
                let x: never = this.operation;

        }
    }
}