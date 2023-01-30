import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

ngOnInit() {
  this.http.get('http://localhost:8000/user').subscribe(data => {
    console.log(data);
  });
}
