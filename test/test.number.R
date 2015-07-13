options( digits = 16 );

lambda = 5
k = 2.5
x = c( 0, 2.25, pi )

cat( dweibull( x, k, lambda ), sep = ",\n" )
cat( "\n" )

lambda = 5
k = 1

cat( dweibull( 0, k, lambda ), sep = ",\n" )
cat( "\n" )

lambda = 5
k = 2.5

cat( dweibull( 0, k, lambda ), sep = ",\n" )
