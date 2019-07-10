function isprint(string) {
  string.forEach(char => {
    if( /[\x00-\x08\x0E-\x1F\x80-\xFF]/.test(char)) {
      return false;
    }
  });
  return true;
}