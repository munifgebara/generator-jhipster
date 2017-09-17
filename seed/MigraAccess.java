

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.munif.sistemas.seed;

import br.com.munif.sistemas.domain.Documento;
import br.com.munif.sistemas.domain.EstadoCivil;
import br.com.munif.sistemas.domain.Nacionalidade;
import br.com.munif.sistemas.domain.Pessoa;
import br.com.munif.sistemas.domain.Sexo;
import br.com.munif.sistemas.repository.NacionalidadeRepository;
import br.com.munif.sistemas.repository.PessoaRepository;
import com.healthmarketscience.jackcess.Column;
import com.healthmarketscience.jackcess.DatabaseBuilder;
import com.healthmarketscience.jackcess.Row;
import com.healthmarketscience.jackcess.Table;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author munif
 */
@Component
public class MigraAccess {

    private static final Logger log = LoggerFactory.getLogger(SeedOne.class);

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private NacionalidadeRepository nacionalidadeRepository;

    @PersistenceContext
    private EntityManager em;

    private Object recuperaOuCria(Class classe, String atributo, Object valor) {
        try {
            Query q = em.createQuery("from " + classe.getSimpleName() + " obj where obj." + atributo + "=:v");
            q.setParameter("v", valor);
            List resultList = q.getResultList();
            if (resultList.isEmpty()) {
                Object newInstance = classe.newInstance();
                Field declaredField = classe.getDeclaredField(atributo);
                declaredField.setAccessible(true);
                declaredField.set(newInstance, valor);
                em.persist(newInstance);
                em.flush();
                return newInstance;
            }
            return resultList.get(0);
        } catch (Exception ex) {
            log.trace("Recupera Ou Cria", ex);
        }
        return null;
    }

    @Transactional
    public void migra() {
        ZoneId systemDefault = ZoneId.systemDefault();
        try {
            Set<String> tableNames = DatabaseBuilder.open(new File(System.getProperty("user.home") + "/munifsaas/empleados_rev13.mdb")).getTableNames();
            String s = "empleados";
            log.info("----- TABELA " + s);
            Table table = DatabaseBuilder.open(new File(System.getProperty("user.home") + "/munifsaas/empleados_rev13.mdb")).getTable(s);
            List<? extends Column> columns = table.getColumns();
            for (Row r : table) {
                String n = sinonimo(r.getString("nacionalidad"));
                Nacionalidade nacionalidade = (Nacionalidade) recuperaOuCria(Nacionalidade.class, "descricao", n);
                EstadoCivil estadoCivil = (EstadoCivil) recuperaOuCria(EstadoCivil.class, "descricao", sinonimo("ES" + r.getString("estadocivil")));
                Sexo sexo = (Sexo) recuperaOuCria(Sexo.class, "descricao", sinonimo(r.getString("sexo")));
                String nomeInteiro = r.getString("nombre");
                String primeiroNome = nomeInteiro;
                String sobreNome = "";
                if (nomeInteiro != null && nomeInteiro.contains(" ")) {
                    primeiroNome = nomeInteiro.substring(0, nomeInteiro.indexOf(" "));
                    sobreNome = nomeInteiro.substring(nomeInteiro.indexOf(" ") + 1);
                }
                Pessoa p = new Pessoa().nome(primeiroNome).apelido(r.getString("apellido")).nacionalidade(nacionalidade).estadoCivil(estadoCivil).sexo(sexo).sobreNome(sobreNome);
                Date date = r.getDate("nascido-en");
                if (date != null) {
                    ZonedDateTime zd=ZonedDateTime.now();
                }
                em.persist(p);
                Documento d=new Documento(r.getString("documento"));
                em.flush();
            }
        } catch (IOException ex) {
            java.util.logging.Logger.getLogger(MigraAccess.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    private String sinonimo(String p) {
        for (int i = 0; i < SINONIMOS.length; i += 2) {
            if (p.equalsIgnoreCase(SINONIMOS[i])) {
                return SINONIMOS[i + 1];
            }
        }
        return p;

    }

    private String SINONIMOS[] = {
        "Brasileira", "Brasileira",
        "Argentina", "Argentina",
        "Paraguaia", "Paraguaia",
        "Paraguaya", "Paraguaia",
        "Brasilera", "Paraguaia",
        "Paragauaya", "Paraguaia",
        "Pargauaya", "Paraguaia",
        "Paraguaya.-", "Paraguaia",
        "Paraguaaya", "Paraguaia",
        "Paragauya", "Paraguaia",
        "Paraguya", "Paraguaia",
        "Praguaya", "Paraguaia",
        "16/07/2014", "Paraguaia",
        "Brasileña", "Brasileira",
        "Paraguay", "Paraguaia",
        "Brasilerera", "Brasileira",
        "Brasilero", "Brasileira",
        "5.850.777", "Paraguaia",
        "Basileño", "Paraguaia",
        "5.105.608", "Paraguaia",
        "Parguaya", "Paraguaia",
        "13/03/1972", "Paraguaia",
        "M", "Masculino",
        "F", "Feminino",
        "ESCasado", "Casado",
        "ESSolteiro", "Solteiro",
        "ESSoltero", "Solteiro",
        "ESParaguaya", "Solteiro",
        "ESSoltera", "Solteiro",
        "ESMenor", "Solteiro",
        "ESCasada", "Casado",
        "ESSolter0", "Solteiro",
        "ESSotero", "Solteiro",
        "ESSolltero", "Solteiro"

    };

}
