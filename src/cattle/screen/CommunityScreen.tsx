import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

interface Message {
  id: string;
  text: string;
  sender: string;
  time: string;
  isSelf: boolean;
  avatar?: string;
  
  // Aligned database fields
  authorId?: string;
  category?: 'GENERAL' | 'DISEASE_ALERT' | 'BREEDING_TIPS' | 'FEED_MANAGEMENT' | 'GOVERNMENT_SCHEMES';
  isExpertAnswered?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hello everyone! How's the cattle health in the north region?",
    sender: 'John Doe',
    time: '10:00 AM',
    isSelf: false,
    avatar: 'https://i.pravatar.cc/150?u=john',
    authorId: 'usr-john',
    category: 'GENERAL',
    isExpertAnswered: true
  },
  {
    id: '2',
    text: "Doing great here. Just finished the vaccination drive.",
    sender: 'Sarah Smith',
    time: '10:05 AM',
    isSelf: false,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    authorId: 'usr-sarah',
    category: 'DISEASE_ALERT',
    isExpertAnswered: false
  },
  {
    id: '3',
    text: "That's good to hear. I'm looking for some advice on organic feed.",
    sender: 'You',
    time: '10:10 AM',
    isSelf: true,
    authorId: 'usr-self',
    category: 'FEED_MANAGEMENT',
    isExpertAnswered: false
  },
  {
    id: '4',
    text: "I highly recommend the green clover mix. My herd loves it!",
    sender: 'Mike Johnson',
    time: '10:12 AM',
    isSelf: false,
    avatar: 'https://i.pravatar.cc/150?u=mike',
    authorId: 'usr-mike',
    category: 'FEED_MANAGEMENT',
    isExpertAnswered: true
  },
  {
    id: '5',
    text: "Thanks Mike! I'll check it out.",
    sender: 'You',
    time: '10:15 AM',
    isSelf: true,
    authorId: 'usr-self',
    category: 'GENERAL',
    isExpertAnswered: false
  },
];

const CommunityScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
      authorId: 'usr-self',
      category: 'GENERAL',
      isExpertAnswered: false
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View style={[styles.messageContainer, item.isSelf ? styles.selfContainer : styles.otherContainer]}>
        {!item.isSelf && (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        )}
        <View style={[
          styles.bubble,
          item.isSelf ? styles.selfBubble : styles.otherBubble,
          !item.isSelf && styles.otherBubbleShadow
        ]}>
          {!item.isSelf && (
            <View style={styles.senderHeader}>
              <Text style={styles.senderName}>{item.sender}</Text>
              {item.isExpertAnswered && (
                <View style={styles.expertBadge}>
                  <Icon name="verified" size={10} color="white" />
                  <Text style={styles.expertBadgeText}>EXPERT</Text>
                </View>
              )}
            </View>
          )}
          <Text style={[styles.messageText, item.isSelf ? styles.selfText : styles.otherText]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText, item.isSelf ? styles.selfTime : styles.otherTime]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Farmer's Community</Text>
          <Text style={styles.headerSubtitle}>1,240 members • 45 online</Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Icon name="more-vert" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.content}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        {/* Input Area */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Icon name="add" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Share your thoughts..."
              placeholderTextColor={COLORS.secondary + '80'}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <Icon name="send" size={20} color={COLORS.isDark ? '#0F291E' : 'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  headerAction: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    maxWidth: '85%',
  },
  selfContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  otherContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: COLORS.border,
  },
  bubble: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  selfBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  otherBubbleShadow: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: COLORS.isDark ? 0.2 : 0.1,
    shadowRadius: 5,
  },
  senderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6
  },
  expertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3
  },
  expertBadgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  senderName: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.gold,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
  },
  selfText: {
    color: COLORS.isDark ? '#0F291E' : 'white',
  },
  otherText: {
    color: COLORS.primary,
  },
  timeText: {
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  selfTime: {
    color: COLORS.isDark ? 'rgba(15, 41, 30, 0.6)' : 'rgba(255,255,255,0.6)',
  },
  otherTime: {
    color: COLORS.secondary,
  },
  inputWrapper: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: COLORS.background,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: COLORS.isDark ? 0.2 : 0.1,
    shadowRadius: 8,
  },
  attachButton: {
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
    color: COLORS.primary,
    maxHeight: 100,
    paddingVertical: 5,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.secondary,
    opacity: 0.5,
  },
});

export default CommunityScreen;
