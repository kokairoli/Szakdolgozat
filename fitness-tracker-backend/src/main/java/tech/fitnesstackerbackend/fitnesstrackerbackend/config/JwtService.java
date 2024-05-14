package tech.fitnesstackerbackend.fitnesstrackerbackend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String KEY = "KqwLG2Yt2jopqdWeq6k3mAnLSlptPJ8jf7g6FEuyOT+jAUdhFbKtPY+JY+gJh+/W1oqjov+x4JPkrjcfvlT+m6kjLko6PUOmULQP0iCjybC5+OMGsrQdQbxJQ4cXEax8nv3EdeSkmilZ/pU7Y+vyyQ";
    private final Integer tokenValidUntilInMillis = 10000*60*100;



    public String extractEmail(String token) {
        return extractClaim(token,Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims,T> resolver){
        final Claims extractedClaims = extractAllClaims(token);
        return resolver.apply(extractedClaims);
    }



    public String generateToken(HashMap<String,String> extraClaims,UserDetails userDetails){
        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername()).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis()+tokenValidUntilInMillis)).signWith(getSignInKey(), SignatureAlgorithm.HS256).compact();
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }

    private SecretKey getSignInKey() {
        byte[] bytes = Decoders.BASE64.decode(KEY);
        return Keys.hmacShaKeyFor(bytes);
    }

    public boolean isTokenValid(String token,UserDetails userDetails){
        return extractEmail(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

}
