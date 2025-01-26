import { ResolveFn } from '@angular/router';
import { Member } from '../_models/member';
import { inject } from '@angular/core';
import { MembersService } from '../_services/members.service';

export const memberDetailedResolver: ResolveFn<Member | null> = (route, state) => { 
  // ResolveFn will wait for the route to resolve and have data available before loading the component
  const memberService = inject(MembersService);

  const username = route.paramMap.get('username'); 
  if (!username) return null;

  return memberService.getMember(username); // return the data
};
