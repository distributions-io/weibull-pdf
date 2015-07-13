options( digits = 16 );

lambda = 4
k = 3.21
x = seq( 1, 5, 1 )

cat( dweibull( x, k, lambda ), sep = ",\n" )
