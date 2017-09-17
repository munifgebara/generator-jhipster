
import { Message } from 'primeng/primeng';

export class SuperCrud {

    msgs: Message[] = [];

    constructor(protected service) {

    }
    ngOnInit() {
        this.service.errorHandler = error => this.error(error);
    }
    error(erro) {
        console.log(erro);
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: erro });
    }


}