import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    template: ''
})

export class BaseComponent {

    constructor(readonly translateService: TranslateService) {
    }

    protected translate(
        key: string,
        args?: any|null
    ): string {
        if(args) {
            return this.translateService.instant(key, args); 
        }
        return this.translateService.instant(key);
    }

}
