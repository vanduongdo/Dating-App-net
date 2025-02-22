import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../_services/likes.service';
import { PresenceService } from '../../_services/presence.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
  // encapsulation: ViewEncapsulation.Emulated,
})
export class MemberCardComponent {
  private likeSerive = inject(LikesService);
  private presenceService = inject(PresenceService);
  member = input.required<Member>();
  // when we want to work a value from another signal, we can use a computed signal
  hasLiked = computed(() =>
    this.likeSerive.likeIds().includes(this.member().id)
  );
  isOnline = computed(() =>
    this.presenceService.onlineUsers().includes(this.member().userName)
  );

  toggleLike() {
    // get member of the signal
    this.likeSerive.toogleLike(this.member().id).subscribe({
      // this is an observable that doesn't do anything until you subscribe to it
      next: () => {
        if (this.hasLiked()) {
          this.likeSerive.likeIds.update((ids) =>
            ids.filter((id) => id !== this.member().id)
          );
        } else {
          this.likeSerive.likeIds.update((ids) => [...ids, this.member().id]);
        }
      },
    });
  }
}
