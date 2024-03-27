import { Component, OnInit } from '@angular/core';
import {Number} from "../number";
import {NumberService} from "../../../../services/number-typical/number.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-number-add',
  templateUrl: './number-add.component.html',
  styleUrls: ['./number-add.component.css']
})
export class NumberAddComponent implements OnInit {

  typicalNum: Number = new Number();
  id: any;

  constructor(private numService: NumberService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.numService.getById(this.id).subscribe(data =>{
        this.typicalNum = data;
      })
    }
  }

  goToTypicalList(){
    this.router.navigate(['/admin/dashboard']);
  }

  onSubmit(){
    if(this.id){
      this.numService.updateTypicalNum(this.id, this.typicalNum).subscribe(() => this.goToTypicalList())
    }else{
      this.numService.createNumber(this.typicalNum).subscribe( () => this.goToTypicalList())
    }
  }

}
