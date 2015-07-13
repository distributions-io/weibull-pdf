options( digits = 16 );

cat( "number:\n\n" )
lambda = 1
k = 1

cat( dweibull( 0, k, lambda ), sep = ",\n" )
cat( dweibull( 2.25, k, lambda ), sep = ",\n" )
cat( "\n" )

cat( "array:\n\n" )
lambda = 1
k = 1
x = seq( 0, 2, 0.5 )

cat( dweibull( x, k, lambda ), sep = ",\n" )
cat( "\n" )

cat( "typed-array:\n\n" )
lambda = 1
k = 1
x = seq( 0, 4, 1 )

cat( dweibull( x, k, lambda ), sep = ",\n" )
cat( "\n" )

cat( "accessor:\n\n" )
lambda = 1
k = 1
x = seq( 0, 2, 0.5 )

cat( dweibull( x, k, lambda ), sep = ",\n" )
cat( "\n" )

cat( "deepset:\n\n" )
lambda = 1
k = 1
x = seq( 0, 2, 0.5 )

cat( dweibull( x, k, lambda ), sep = ",\n" )
cat( "\n" )

cat( "matrix:\n\n" )
lambda = 1
k = 1
x = c( 0, 0, 1, 1, 2, 2 )

cat( dweibull( x, k, lambda ), sep = ",\n" )
cat( "\n" )

cat( "matrix (float32):\n\n" )
lambda = 1
k = 1
x = c( 0, 0, 1, 1, 2, 2 )

cat( dweibull( x, k, lambda ), sep = ",\n" )
