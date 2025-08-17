export const onPlatformEnter = (e) => {
  const el = e.currentTarget;
  el.classList.remove('bounce-stay');
  void el.offsetWidth;
  el.classList.add('bounce-stay');
};

export const onPlatformLeave = (e) => {
  const el = e.currentTarget;
  el.classList.remove('bounce-stay');
  el.style.transform = 'translateY(0)';
};
