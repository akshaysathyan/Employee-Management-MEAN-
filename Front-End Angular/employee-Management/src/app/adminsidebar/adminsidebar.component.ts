import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminsidebarComponent implements OnInit {

  constructor(private _router:Router,) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear()
    // this._router.navigate(['/login'])
    window.location.reload();
    // this._router.navigate(['/login'])
    
  }



}
