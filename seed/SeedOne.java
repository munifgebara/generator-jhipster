package br.com.munif.sistemas.seed;

import br.com.munif.framework.vicente.core.RightsHelper;
import br.com.munif.framework.vicente.core.VicThreadScope;
import br.com.munif.sistemas.domain.Cidade;
import br.com.munif.sistemas.domain.Estado;
import br.com.munif.sistemas.domain.EstadoCivil;
import br.com.munif.sistemas.domain.Nacionalidade;
import br.com.munif.sistemas.domain.Pais;
import br.com.munif.sistemas.domain.Sexo;
import br.com.munif.sistemas.domain.TipoObservacao;
import br.com.munif.sistemas.domain.TipoParentesco;
import br.com.munif.sistemas.repository.CidadeRepository;
import br.com.munif.sistemas.repository.EstadoCivilRepository;
import br.com.munif.sistemas.repository.EstadoRepository;
import br.com.munif.sistemas.repository.NacionalidadeRepository;
import br.com.munif.sistemas.repository.PaisRepository;
import br.com.munif.sistemas.repository.SexoRepository;
import br.com.munif.sistemas.repository.TipoObservacaoRepository;
import br.com.munif.sistemas.repository.TipoParentescoRepository;
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
public class SeedOne {
    
    private static final Logger log = LoggerFactory.getLogger(SeedOne.class);
    @Autowired
    private PaisRepository paisRepository;
    
    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private CidadeRepository cidadeRepository;
    
    @Autowired
    private EstadoCivilRepository estadoCivilRepository;
    
    @Autowired
    private NacionalidadeRepository nacionalidadeRepository;
    
    @Autowired
    private SexoRepository sexoRepository;
    
    @Autowired
    private TipoObservacaoRepository tipoObservacaoRepository;
    
    @Autowired
    private TipoParentescoRepository tipoParentescoRepository;

    @Transactional
    public void seed(){
        log.info("Starting seed");
        
        VicThreadScope.gi.set("SEED");
        VicThreadScope.ui.set("SEED");
        VicThreadScope.ip.set("127.0.0.1");
        VicThreadScope.defaultRights.set(RightsHelper.OTHER_READ);
        if (paisRepository.count()>0){
            return;
        }
        log.info("Inserting data");
        
        Pais brasil=new Pais("Brasil");
        Pais argentina=new Pais("Argentina");
        Pais paraguai=new Pais("Paraguai");
        
        paisRepository.saveAndFlush(brasil);
        paisRepository.saveAndFlush(argentina);
        paisRepository.saveAndFlush(paraguai);
        
        Estado e0=new Estado().nome("Santa Catarina").pais(brasil);
        Estado e1=new Estado().nome("Paraná").pais(brasil);
        Estado e2=new Estado().nome("São Paulo").pais(brasil);
        
        Estado e3=new Estado().nome("Amambay").pais(paraguai);
        Estado e4=new Estado().nome("Distrito").pais(paraguai);
        Estado e5=new Estado().nome("Boquerón").pais(paraguai);
        
        Estado e6=new Estado().nome("Central").pais(argentina);
        Estado e7=new Estado().nome("Novo Cuyo").pais(argentina);
        Estado e8=new Estado().nome("Patagônia").pais(argentina);
        
        estadoRepository.saveAndFlush(e0);
        estadoRepository.saveAndFlush(e1);
        estadoRepository.saveAndFlush(e2);
        estadoRepository.saveAndFlush(e3);
        estadoRepository.saveAndFlush(e4);
        estadoRepository.saveAndFlush(e5);
        estadoRepository.saveAndFlush(e6);
        estadoRepository.saveAndFlush(e7);
        estadoRepository.saveAndFlush(e8);
        
        cidadeRepository.saveAndFlush(new Cidade().estado(e0).nome("FLorianópilis"));
        cidadeRepository.saveAndFlush(new Cidade().estado(e1).nome("Maringá"));
        cidadeRepository.saveAndFlush(new Cidade().estado(e2).nome("Rio Preto"));
        cidadeRepository.saveAndFlush(new Cidade().estado(e3).nome("Cidade A"));
        cidadeRepository.saveAndFlush(new Cidade().estado(e4).nome("Cidade B"));
        cidadeRepository.saveAndFlush(new Cidade().estado(e5).nome("Cidade C"));
        cidadeRepository.saveAndFlush(new Cidade().estado(e6).nome("Cidade D"));
        cidadeRepository.saveAndFlush(new Cidade().estado(e7).nome("Cidade E"));
        
        nacionalidadeRepository.saveAndFlush(new Nacionalidade().descricao("Brasileira"));
        nacionalidadeRepository.saveAndFlush(new Nacionalidade().descricao("Argentina"));
        nacionalidadeRepository.saveAndFlush(new Nacionalidade().descricao("Paraguaia"));
        
        estadoCivilRepository.saveAndFlush(new EstadoCivil().descricao("Casado"));
        estadoCivilRepository.saveAndFlush(new EstadoCivil().descricao("Solteiro"));
        
        sexoRepository.saveAndFlush(new Sexo().descricao("Masculino"));
        sexoRepository.saveAndFlush(new Sexo().descricao("Feminino"));
        
        tipoObservacaoRepository.saveAndFlush(new TipoObservacao().descricao("Falta de documentos"));
        tipoObservacaoRepository.saveAndFlush(new TipoObservacao().descricao("Doença"));
        tipoObservacaoRepository.saveAndFlush(new TipoObservacao().descricao("Outros"));
        
        tipoParentescoRepository.saveAndFlush(new TipoParentesco("Filho"));
        tipoParentescoRepository.saveAndFlush(new TipoParentesco("Pai"));
        
        
        
        
        
        
        
    }  
    
    
}
