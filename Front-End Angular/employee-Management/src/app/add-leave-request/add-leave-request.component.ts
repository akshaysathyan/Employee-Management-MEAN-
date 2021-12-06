import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl, NgForm,} from '@angular/forms';
import { LeavesService } from '../services/leaves.service';
import { TosterService } from '../services/toster.service';

@Component({
  selector: 'app-add-leave-request',
  templateUrl: './add-leave-request.component.html',
  styleUrls: ['./add-leave-request.component.css']
})
export class AddLeaveRequestComponent implements OnInit {
  LeaveReqForm: FormGroup;
  isSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private LeaveService:LeavesService,
    private toster:TosterService) {
    this.LeaveReqForm = this.formBuilder.group({
      email:new FormControl(''),
      subject: new FormControl('', []),
      leaveType: new FormControl('', []),
      reason: new FormControl('', []),
      fromDate: new FormControl('', []),
      toDate: new FormControl('', []),
     
    });

   }

  ngOnInit(): void {
  }

  onLeaveSubmit(){
    this.LeaveService.postLeave(this.LeaveReqForm.value).subscribe((result)=>{
      console.log(result)
      this.toster.showSuccess('requested Succesfully')
      window.location.reload();

    })
  }

}
