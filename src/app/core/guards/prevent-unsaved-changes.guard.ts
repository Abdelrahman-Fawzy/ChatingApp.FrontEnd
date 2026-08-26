import { CanDeactivateFn } from '@angular/router';
import { MemberProfileComponent } from 'src/app/features/members/member-profile/member-profile.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<
  MemberProfileComponent
> = (component, currentRoute, currentState, nextState) => {
  if (component?.editForm?.dirty) {
    return confirm(
      'هل أنت متأكد من رغبتك في المتابعة؟ ستفقد جميع التغييرات غير المحفوظة.',
    );
  }

  return true;
};
