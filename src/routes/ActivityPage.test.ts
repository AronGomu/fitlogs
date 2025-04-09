import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/svelte';
import ActivityPage from './ActivityPage.svelte';

test('it renders activity page', () => {
  const activityPage = render(ActivityPage);
  expect(1).toBe(1);
  // console.log(activityPage);
});