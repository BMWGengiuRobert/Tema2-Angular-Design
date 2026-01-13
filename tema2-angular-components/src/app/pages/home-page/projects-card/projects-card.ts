import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { UsersService } from '../../../services/users.service';
import { ProjectDBModel } from '../../../db/project-db.model';
import { getProjectsByUserId } from '../../../db/mocked-db';
import { getTasksByProjectId } from '../../../db/mocked-db';

@Component({
  selector: 'app-projects-card',
  imports: [CommonModule],
  templateUrl: './projects-card.html',
  styleUrl: './projects-card.sass',
})
export class ProjectsCard implements OnInit, OnDestroy {

  projects = [] as ProjectDBModel[];
  private userSubscription: Subscription = new Subscription();

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.selectedUser$.subscribe({
      next: (selectedUser) => {
        this.projects = getProjectsByUserId(selectedUser.id);
      },
      error: (err) => {
        console.error('Error fetching user projects:', err);
      },
      complete: () => {
        console.log('Completed fetching user projects.');
      }
    });
  }

  getTasksByProjectId(projectId: number): number {
    return getTasksByProjectId(projectId).length;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
