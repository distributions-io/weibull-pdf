options( digits = 16 );

lambda = 2
k = 3
x = seq( 0, 2.5, 0.5 )

cat( dweibull( x, k, lambda ), sep = ",\n" )
