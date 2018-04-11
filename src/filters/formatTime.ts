export const formatTime = (time: number) => {
  const val = Math.floor(time / 1000);
  let HH: string | number = Math.floor(val / 3600);
  let MM: string | number = Math.floor(val % 3600 / 60);
  let SS: string | number = val % 60;
  let min: string = '';
  if (HH < 10) { HH = `0${HH}`; }
  if (MM < 10) { MM = `0${MM}`; }
  if (SS < 10) { SS = `0${SS}`; }
  min = `${HH}:${MM}:${SS}`;

  return min;
};
