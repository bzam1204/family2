export function formatToDecimal( string : string ) : string {
  const number = Number( string );
  if ( isNaN( number ) ) {
    return string;
  }

  const formatter = new Intl.NumberFormat( "pt-br", {
    minimumFractionDigits : 2,
    maximumFractionDigits : 2,
  } );

  const res = formatter.format( number );

  console.log( { res } )

  return res;
}