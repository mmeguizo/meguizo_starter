import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(
    public auth: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private modalService: BsModalService,
    private confirmService: ConfirmModalComponent

  ) {



  }

  ngOnInit(): void {

  }



  logout(): void {
    const modal = this.modalService.show(ConfirmModalComponent, { class: 'modal-sm' });
    (<ConfirmModalComponent>modal.content).showConfirmationModal(
      'Logging Out?',
      'Confirm logout'
    );

    (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        // when pressed Yes
        console.log('press yes');
        this.auth.logout();
        this.toaster.success('Bye')

        this.router.navigateByUrl('/login');

      } else if (result === false) {
        // when pressed No
        this.toaster.info('Thanks for Staying')
      } else {
        // When closing the modal without no or yes
        console.log('niether');
        this.toaster.info('Thanks for Staying')
        // this.toaster.warning('Hmm, no response... but hey your here!!')
      }
    });
  }



}

